import { useState, useCallback, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { Menu } from './components/Menu/Menu'
import { GameBoard } from './components/GameBoard/GameBoard'
import { HUD } from './components/HUD/HUD'
import { GameOver } from './components/GameOver/GameOver'
import { useKeyboard } from './hooks/useKeyboard'
import { useGameLoop } from './hooks/useGameLoop'
import { useLocalStorage } from './hooks/useLocalStorage'
import {
  moveHead,
  wrapPosition,
  checkSelfCollision,
  isOppositeDirection,
  createInitialSnake,
} from './utils/snake'
import { randomPosition, positionsEqual, manhattanDistance, getNearestPosition } from './utils/grid'
import {
  shouldSpawnPowerup,
  createPowerup,
  shouldSpawnGoldenFood,
  shouldRemoveItem,
  isWithinMagnetRange,
  getScoreForItem,
} from './utils/items'
import type {
  Direction,
  Position,
  GridItem,
  GamePhase,
  GameConfig,
  ActiveEffect,
  GameStats,
} from './types/game'
import {
  BASE_TICK_SPEED,
  MIN_TICK_SPEED,
  SPEED_BOOST_AMOUNT,
  SLOW_AMOUNT,
  POWERUP_DURATION,
  COMBO_TIMEOUT,
} from './types/game'

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.arcade};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 10px;
`

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 100vw;
  padding: 0 10px;
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 50;
`

const PauseText = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 4px;
`

function App() {
  const [phase, setPhase] = useState<GamePhase>('menu')
  const [snake, setSnake] = useState<Position[]>(createInitialSnake(20))
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [food, setFood] = useState<GridItem[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [foodEaten, setFoodEaten] = useState(0)
  const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>([])
  const [tickSpeed, setTickSpeed] = useState(BASE_TICK_SPEED)
  const [highScore, setHighScore] = useLocalStorage('snake-highscore', 0)
  const [config, setConfig] = useLocalStorage<GameConfig>('snake-config', {
    gridSize: 20,
    skin: { type: 'striped', colors: ['#ff6b6b', '#ffd93d'], pattern: 'stripes' },
    mode: 'powerups-3',
  })
  const [stats, setStats] = useState<GameStats>({ foodEaten: 0, powerupsCollected: 0, duration: 0 })

  const nextDirectionRef = useRef<Direction>('RIGHT')
  const directionRef = useRef<Direction>('RIGHT')
  const snakeRef = useRef<Position[]>(createInitialSnake(20))
  const foodRef = useRef<GridItem[]>([])
  const scoreRef = useRef(0)
  const comboRef = useRef(1)
  const foodEatenRef = useRef(0)
  const lastFoodTimeRef = useRef(0)
  const lastGoldenFoodRef = useRef(0)
  const activeEffectsRef = useRef<ActiveEffect[]>([])
  const tickSpeedRef = useRef(BASE_TICK_SPEED)
  const configRef = useRef(config)
  const lastPowerupSpawnRef = useRef(0)
  const startTimeRef = useRef(0)
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const ghostUsedRef = useRef(false)

  configRef.current = config

  const isPlaying = phase === 'playing'

  const endGame = useCallback(() => {
    const duration = Date.now() - startTimeRef.current
    setStats({ foodEaten: foodEatenRef.current, powerupsCollected: 0, duration })
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current)
    }
    setPhase('gameover')
  }, [highScore, setHighScore])

  const resetCombo = useCallback(() => {
    setCombo(1)
    comboRef.current = 1
  }, [])

  const startGame = useCallback(() => {
    const gs = configRef.current.gridSize
    const initialSnake = createInitialSnake(gs)
    const head = initialSnake[0]
    const headRight = { x: Math.min(head.x + 2, gs - 1), y: head.y }
    const initialFood: GridItem[] = [
      { type: 'food', position: headRight, spawnedAt: Date.now() },
    ]

    snakeRef.current = initialSnake
    foodRef.current = initialFood
    scoreRef.current = 0
    comboRef.current = 1
    foodEatenRef.current = 0
    lastFoodTimeRef.current = 0
    lastGoldenFoodRef.current = 0
    lastPowerupSpawnRef.current = 0
    activeEffectsRef.current = []
    tickSpeedRef.current = BASE_TICK_SPEED
    ghostUsedRef.current = false
    nextDirectionRef.current = 'RIGHT'
    directionRef.current = 'RIGHT'
    startTimeRef.current = Date.now()

    setSnake(initialSnake)
    setFood(initialFood)
    setDirection('RIGHT')
    setScore(0)
    setCombo(1)
    setFoodEaten(0)
    setActiveEffects([])
    setTickSpeed(BASE_TICK_SPEED)
    setPhase('playing')
  }, [])

  const returnToMenu = useCallback(() => {
    setPhase('menu')
  }, [])

  const handleDirection = useCallback(
    (dir: Direction) => {
      const current = directionRef.current
      if (!isOppositeDirection(current, dir)) {
        nextDirectionRef.current = dir
      }
    },
    []
  )

  const handlePause = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'playing') return 'paused'
      if (prev === 'paused') return 'playing'
      return prev
    })
  }, [])

  useKeyboard(handleDirection, handlePause, phase === 'playing' || phase === 'paused')

  const gameTick = useCallback(() => {
    const prevSnake = snakeRef.current
    const prevFood = foodRef.current
    const nextDir = nextDirectionRef.current
    const gs = configRef.current.gridSize
    const mode = configRef.current.mode

    if (nextDir !== directionRef.current) {
      directionRef.current = nextDir
      setDirection(nextDir)
    }

    const head = prevSnake[0]
    const newHead = moveHead(head, nextDir)
    const ghostActive = activeEffectsRef.current.some((e) => e.type === 'ghost')
    const outOfBounds = newHead.x < 0 || newHead.x >= gs || newHead.y < 0 || newHead.y >= gs

    let finalHead: Position
    if (outOfBounds) {
      if (ghostActive && !ghostUsedRef.current) {
        finalHead = wrapPosition(newHead, gs)
        ghostUsedRef.current = true
        setActiveEffects((prev) => prev.filter((e) => e.type !== 'ghost'))
        activeEffectsRef.current = activeEffectsRef.current.filter((e) => e.type !== 'ghost')
      } else {
        endGame()
        return
      }
    } else {
      finalHead = newHead
    }

    const shieldActive = activeEffectsRef.current.some((e) => e.type === 'shield')
    if (checkSelfCollision(finalHead, prevSnake)) {
      if (shieldActive) {
        setActiveEffects((prev) => prev.filter((e) => e.type !== 'shield'))
        activeEffectsRef.current = activeEffectsRef.current.filter((e) => e.type !== 'shield')
      } else {
        endGame()
        return
      }
    }

    const magnetActive = activeEffectsRef.current.some((e) => e.type === 'magnet')
    const now = Date.now()

    // Remove expired items first, then find eaten item by position
    const activeFood = prevFood.filter((item) => !shouldRemoveItem(item, now))
    const eatenItem = activeFood.find((item) => positionsEqual(finalHead, item.position))

    // Magnet: find the nearest food within range
    let magnetItem: GridItem | undefined
    if (magnetActive && !eatenItem) {
      const inRange = activeFood.filter((item) =>
        isWithinMagnetRange(finalHead, item.position, true)
      )
      if (inRange.length > 0) {
        inRange.sort(
          (a, b) =>
            manhattanDistance(finalHead, a.position) -
            manhattanDistance(finalHead, b.position)
        )
        magnetItem = inRange[0]
      }
    }

    const eaten = eatenItem || magnetItem || null

    let newFood: GridItem[]
    let newSnakeBody: Position[]

    if (!eaten) {
      // No food eaten, normal move
      newSnakeBody = [finalHead, ...prevSnake.slice(0, -1)]
      newFood = activeFood
    } else {
      // Ate something
      const points = getScoreForItem(eaten.type) * comboRef.current
      scoreRef.current += points
      setScore(scoreRef.current)

      newFood = activeFood.filter((f) => f !== eaten)

      if (eaten.type === 'food' || eaten.type === 'golden-food') {
        const newFoodEaten = foodEatenRef.current + 1
        foodEatenRef.current = newFoodEaten
        setFoodEaten(newFoodEaten)

        // Combo
        if (now - lastFoodTimeRef.current < COMBO_TIMEOUT) {
          const newCombo = Math.min(comboRef.current + 1, 5)
          comboRef.current = newCombo
          setCombo(newCombo)
        } else {
          comboRef.current = 1
          setCombo(1)
        }
        lastFoodTimeRef.current = now

        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
        comboTimeoutRef.current = setTimeout(resetCombo, COMBO_TIMEOUT)

        // Spawn new food
        const occupied = [finalHead, ...prevSnake, ...newFood.map((f) => f.position)]
        newFood.push({ type: 'food', position: randomPosition(gs, occupied), spawnedAt: now })

        // Golden food
        if (shouldSpawnGoldenFood(newFoodEaten, lastGoldenFoodRef.current)) {
          const goldenOccupied = [finalHead, ...prevSnake, ...newFood.map((f) => f.position)]
          newFood.push({
            type: 'golden-food',
            position: randomPosition(gs, goldenOccupied),
            spawnedAt: now,
          })
          lastGoldenFoodRef.current = newFoodEaten
        }

        // Snake grows
        newSnakeBody = [finalHead, ...prevSnake]
      } else {
        // Power-up eaten
        const effectType = eaten.type as 'speed' | 'slow' | 'shield' | 'magnet' | 'ghost'
        const newEffects = [
          ...activeEffectsRef.current.filter((e) => e.type !== effectType),
          { type: effectType, expiresAt: now + POWERUP_DURATION },
        ]
        activeEffectsRef.current = newEffects
        setActiveEffects(newEffects)

        if (effectType === 'speed') {
          const newSpeed = Math.max(MIN_TICK_SPEED, tickSpeedRef.current - SPEED_BOOST_AMOUNT)
          tickSpeedRef.current = newSpeed
          setTickSpeed(newSpeed)
        } else if (effectType === 'slow') {
          const newSpeed = Math.min(BASE_TICK_SPEED * 2, tickSpeedRef.current + SLOW_AMOUNT)
          tickSpeedRef.current = newSpeed
          setTickSpeed(newSpeed)
        }

        // No growth for power-ups
        newSnakeBody = [finalHead, ...prevSnake.slice(0, -1)]
      }

      // Ensure at least one food exists
      if (newFood.length === 0) {
        const occupied = [finalHead, ...newSnakeBody]
        newFood.push({ type: 'food', position: randomPosition(gs, occupied), spawnedAt: now })
      }
    }

    // Spawn powerups
    if (mode !== 'classic') {
      if (shouldSpawnPowerup(mode, lastPowerupSpawnRef.current, now, newFood)) {
        const occupied = [finalHead, ...newSnakeBody, ...newFood.map((f) => f.position)]
        const powerup = createPowerup(occupied, gs, mode, now)
        if (powerup) {
          newFood.push(powerup)
          lastPowerupSpawnRef.current = now
        }
      }
    }

    snakeRef.current = newSnakeBody
    foodRef.current = newFood
    setSnake(newSnakeBody)
    setFood(newFood)
  }, [endGame, resetCombo])

  useGameLoop(gameTick, tickSpeed, isPlaying)

  // Cleanup effect timers on unmount
  useEffect(() => {
    return () => {
      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AnimatePresence mode="wait">
          {phase === 'menu' && (
            <Menu
              key="menu"
              config={config}
              onConfigChange={setConfig}
              onStart={startGame}
              highScore={highScore}
            />
          )}

          {(phase === 'playing' || phase === 'paused') && (
            <GameContainer key="game">
              <HUD
                score={score}
                highScore={highScore}
                combo={combo}
                speed={tickSpeed}
                mode={config.mode}
                activeEffects={activeEffects}
                foodEaten={foodEaten}
              />
              <GameBoard
                snake={snake}
                food={food}
                gridSize={config.gridSize}
                skin={config.skin}
                direction={direction}
                activeEffects={activeEffects}
              />
              {phase === 'paused' && (
                <Overlay>
                  <PauseText>⏸️ Pausa</PauseText>
                </Overlay>
              )}
            </GameContainer>
          )}

          {phase === 'gameover' && (
            <GameContainer key="gameover">
              <GameBoard
                snake={snake}
                food={food}
                gridSize={config.gridSize}
                skin={config.skin}
                direction={direction}
                activeEffects={activeEffects}
              />
              <GameOver
                score={score}
                highScore={highScore}
                isNewHighScore={score > 0 && score >= highScore}
                stats={stats}
                onRestart={startGame}
                onMenu={returnToMenu}
              />
            </GameContainer>
          )}
        </AnimatePresence>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
