import type { Direction, Position } from '../types/game'

export function moveHead(head: Position, direction: Direction): Position {
  switch (direction) {
    case 'UP': return { x: head.x, y: head.y - 1 }
    case 'DOWN': return { x: head.x, y: head.y + 1 }
    case 'LEFT': return { x: head.x - 1, y: head.y }
    case 'RIGHT': return { x: head.x + 1, y: head.y }
  }
}

export function wrapPosition(pos: Position, gridSize: number): Position {
  return {
    x: ((pos.x % gridSize) + gridSize) % gridSize,
    y: ((pos.y % gridSize) + gridSize) % gridSize,
  }
}

export function checkSelfCollision(head: Position, body: Position[]): boolean {
  return body.some(seg => seg.x === head.x && seg.y === head.y)
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return (
    (current === 'UP' && next === 'DOWN') ||
    (current === 'DOWN' && next === 'UP') ||
    (current === 'LEFT' && next === 'RIGHT') ||
    (current === 'RIGHT' && next === 'LEFT')
  )
}

export function createInitialSnake(gridSize: number): Position[] {
  const mid = Math.floor(gridSize / 2)
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ]
}
