import { motion } from 'framer-motion'
import styled from 'styled-components'
import type { Position, GridItem, SnakeSkin, Direction, ActiveEffect } from '../../types/game'
import { Snake } from './Snake'
import { Food } from './Food'

interface GameBoardProps {
  snake: Position[]
  food: GridItem[]
  gridSize: number
  skin: SnakeSkin
  direction: Direction
  activeEffects: ActiveEffect[]
}

const BoardContainer = styled(motion.div)<{ $gridSize: number }>`
  position: relative;
  width: min(80vw, 80vh, 600px);
  height: min(80vw, 80vh, 600px);
  background: ${({ theme }) => theme.colors.gridCell};
  border: 2px solid ${({ theme }) => theme.colors.gridLine};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(108, 92, 231, 0.2);
`

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.15;
`

const CellRow = styled.div`
  display: flex;
`

const Cell = styled.div<{ $gridSize: number }>`
  width: ${({ $gridSize }) => 100 / $gridSize}%;
  aspect-ratio: 1;
  border: 0.5px solid ${({ theme }) => theme.colors.gridLine};
`

export function GameBoard({ snake, food, gridSize, skin, direction, activeEffects }: GameBoardProps) {
  const shieldActive = activeEffects.some((e) => e.type === 'shield')
  const ghostActive = activeEffects.some((e) => e.type === 'ghost')

  return (
    <BoardContainer
      $gridSize={gridSize}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <GridLines>
        {Array.from({ length: gridSize }).map((_, row) => (
          <CellRow key={row}>
            {Array.from({ length: gridSize }).map((_, col) => (
              <Cell key={col} $gridSize={gridSize} />
            ))}
          </CellRow>
        ))}
      </GridLines>

      <Snake
        segments={snake}
        skin={skin}
        gridSize={gridSize}
        direction={direction}
        shieldActive={shieldActive}
        ghostActive={ghostActive}
      />

      <Food items={food} gridSize={gridSize} />
    </BoardContainer>
  )
}
