import type { Position, GridItem, GameMode, PowerUpType } from '../types/game'
import {
  POWERUP_3,
  POWERUP_5,
  POWERUP_SPAWN_INTERVAL,
  POWERUP_LIFETIME,
  GOLDEN_FOOD_INTERVAL,
  GOLDEN_FOOD_LIFETIME,
  MAGNET_RANGE,
} from '../types/game'
import { randomPosition, manhattanDistance } from './grid'

export function getAvailablePowerups(mode: GameMode): PowerUpType[] {
  if (mode === 'powerups-5') return POWERUP_5
  if (mode === 'powerups-3') return POWERUP_3
  return []
}

export function shouldSpawnPowerup(
  mode: GameMode,
  lastPowerupSpawn: number,
  now: number,
  activePowerups: GridItem[]
): boolean {
  if (mode === 'classic') return false
  if (activePowerups.length >= 2) return false
  return now - lastPowerupSpawn >= POWERUP_SPAWN_INTERVAL
}

export function createPowerup(
  occupied: Position[],
  gridSize: number,
  mode: GameMode,
  now: number
): GridItem | null {
  const available = getAvailablePowerups(mode)
  if (available.length === 0) return null
  const type = available[Math.floor(Math.random() * available.length)]
  return {
    type,
    position: randomPosition(gridSize, occupied),
    spawnedAt: now,
  }
}

export function shouldSpawnGoldenFood(
  foodEaten: number,
  lastGoldenFood: number
): boolean {
  return foodEaten > 0 && foodEaten % GOLDEN_FOOD_INTERVAL === 0 && lastGoldenFood !== foodEaten
}

export function shouldRemoveItem(item: GridItem, now: number): boolean {
  if (item.type === 'food') return false
  const lifetime = item.type === 'golden-food' ? GOLDEN_FOOD_LIFETIME : POWERUP_LIFETIME
  return now - item.spawnedAt >= lifetime
}

export function isWithinMagnetRange(
  head: Position,
  itemPosition: Position,
  magnetActive: boolean
): boolean {
  if (!magnetActive) return false
  return manhattanDistance(head, itemPosition) <= MAGNET_RANGE
}

export function getScoreForItem(type: GridItem['type']): number {
  switch (type) {
    case 'food': return 10
    case 'golden-food': return 50
    case 'speed':
    case 'slow':
    case 'shield':
    case 'magnet':
    case 'ghost': return 25
  }
}
