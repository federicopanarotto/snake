export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface Position {
  x: number
  y: number
}

export type SnakeSkinType = 'solid' | 'gradient' | 'striped'

export type StripedPattern = 'stripes' | 'checkerboard' | 'random'

export interface SnakeSkin {
  type: SnakeSkinType
  colors: string[]
  pattern?: StripedPattern
}

export type GameMode = 'classic' | 'powerups-3' | 'powerups-5'

export type PowerUpType = 'speed' | 'slow' | 'shield' | 'magnet' | 'ghost'

export interface GridItem {
  type: 'food' | 'golden-food' | PowerUpType
  position: Position
  spawnedAt: number
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameover'

export interface GameConfig {
  gridSize: 15 | 20 | 25
  skin: SnakeSkin
  mode: GameMode
}

export interface ActiveEffect {
  type: PowerUpType
  expiresAt: number
}

export interface GameStats {
  foodEaten: number
  powerupsCollected: number
  duration: number
}

export const GRID_SIZES = [15, 20, 25] as const

export const POWERUP_3: PowerUpType[] = ['speed', 'slow', 'shield']
export const POWERUP_5: PowerUpType[] = ['speed', 'slow', 'shield', 'magnet', 'ghost']

export const POWERUP_EMOJI: Record<PowerUpType, string> = {
  speed: '🚀',
  slow: '🐢',
  shield: '🛡️',
  magnet: '🧲',
  ghost: '👻',
}

export const POWERUP_LABELS: Record<PowerUpType, string> = {
  speed: 'Velocità',
  slow: 'Lento',
  shield: 'Scudo',
  magnet: 'Magnete',
  ghost: 'Fantasma',
}

export const POWERUP_DESCRIPTIONS: Record<PowerUpType, string> = {
  speed: 'Aumenta la velocità',
  slow: 'Rallenta il serpente',
  shield: 'Assorbe 1 collisione',
  magnet: 'Attira il cibo vicino',
  ghost: 'Passa attraverso i muri',
}

export const POWERUP_DURATION = 10000
export const POWERUP_SPAWN_INTERVAL = 10000
export const POWERUP_LIFETIME = 15000
export const GOLDEN_FOOD_INTERVAL = 5
export const GOLDEN_FOOD_LIFETIME = 10000
export const BASE_TICK_SPEED = 150
export const MIN_TICK_SPEED = 60
export const SPEED_BOOST_AMOUNT = 40
export const SLOW_AMOUNT = 40
export const MAGNET_RANGE = 3
export const COMBO_TIMEOUT = 3000
