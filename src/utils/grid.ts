import type { Position } from '../types/game'

export function randomPosition(gridSize: number, occupied: Position[]): Position {
  const occupiedSet = new Set(occupied.map(p => `${p.x},${p.y}`))
  const available: Position[] = []
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!occupiedSet.has(`${x},${y}`)) {
        available.push({ x, y })
      }
    }
  }
  if (available.length === 0) return { x: 0, y: 0 }
  return available[Math.floor(Math.random() * available.length)]
}

export function isOutOfBounds(pos: Position, gridSize: number): boolean {
  return pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y
}

export function manhattanDistance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function getNearestPosition(target: Position, candidates: (Position | null)[]): Position | null {
  const valid = candidates.filter((c): c is Position => c !== null)
  if (valid.length === 0) return null
  let nearest = valid[0]
  let minDist = manhattanDistance(target, nearest)
  for (let i = 1; i < valid.length; i++) {
    const dist = manhattanDistance(target, valid[i])
    if (dist < minDist) {
      minDist = dist
      nearest = valid[i]
    }
  }
  return nearest
}
