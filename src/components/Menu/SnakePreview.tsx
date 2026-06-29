import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import type { SnakeSkin, Direction } from '../../types/game'
import { moveHead } from '../../utils/snake'

interface SnakePreviewProps {
  skin: SnakeSkin
}

const PREVIEW_SIZE = 8

interface PreviewSegment {
  x: number
  y: number
}

const DIRECTIONS: Direction[] = ['RIGHT', 'DOWN', 'LEFT', 'UP']

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const Segment = styled(motion.div)<{ $color: string; $ghost: boolean }>`
  position: absolute;
  border-radius: 3px;
  background: ${({ $color }) => $color};
  opacity: ${({ $ghost }) => ($ghost ? 0.5 : 1)};
  box-shadow: ${({ $color }) => `0 0 4px ${$color}80`};
`

const FoodDot = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: #ffd93d;
  box-shadow: 0 0 8px rgba(255, 217, 61, 0.6);
`

function createPreviewSnake(): PreviewSegment[] {
  const segments: PreviewSegment[] = []
  for (let i = 0; i < 4; i++) {
    segments.push({ x: 3 - i, y: 3 })
  }
  return segments
}

function blendColors(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace('#', ''), 16)
  const bh = parseInt(b.replace('#', ''), 16)
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff
  const rr = Math.round(ar + (br - ar) * t)
  const rg = Math.round(ag + (bg - ag) * t)
  const rb = Math.round(ab + (bb - ab) * t)
  return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)}`
}

function getColor(segments: PreviewSegment[], index: number, skin: SnakeSkin): string {
  const colors = skin.colors
  if (colors.length === 0) return '#ff6b6b'
  switch (skin.type) {
    case 'solid':
      return colors[0]
    case 'gradient': {
      const t = index / Math.max(segments.length - 1, 1)
      const ratio = Math.min(t * (colors.length - 1), colors.length - 1)
      const idxA = Math.floor(ratio)
      const idxB = Math.min(idxA + 1, colors.length - 1)
      const frac = ratio - idxA
      return idxA === idxB ? colors[idxA] : blendColors(colors[idxA], colors[idxB], frac)
    }
    case 'striped': {
      const pattern = skin.pattern || 'stripes'
      switch (pattern) {
        case 'checkerboard': return colors[Math.floor(index / 2) % colors.length]
        case 'random': return colors[Math.abs((index * 7 + index * 31) % colors.length)]
        case 'stripes':
        default: return colors[index % colors.length]
      }
    }
  }
}

export function SnakePreview({ skin }: SnakePreviewProps) {
  const [segments, setSegments] = useState<PreviewSegment[]>(createPreviewSnake())
  const [food, setFood] = useState<PreviewSegment>({ x: 6, y: 3 })
  const [dirIndex, setDirIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSegments((prev) => {
        const head = prev[0]
        const dir = DIRECTIONS[dirIndex % 4]
        let newHead = moveHead(head, dir)

        // Check bounds for preview grid and wrap
        if (newHead.x < 0 || newHead.x >= PREVIEW_SIZE || newHead.y < 0 || newHead.y >= PREVIEW_SIZE) {
          setDirIndex((i) => i + 1)
          return prev
        }

        // Check self-collision
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setDirIndex((i) => i + 1)
          return prev
        }

        const ate = newHead.x === food.x && newHead.y === food.y

        const newSegments = ate
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)]

        if (ate) {
          const occupiedSet = new Set(newSegments.map((s) => `${s.x},${s.y}`))
          const available: PreviewSegment[] = []
          for (let x = 0; x < PREVIEW_SIZE; x++) {
            for (let y = 0; y < PREVIEW_SIZE; y++) {
              if (!occupiedSet.has(`${x},${y}`)) {
                available.push({ x, y })
              }
            }
          }
          if (available.length > 0) {
            setFood(available[Math.floor(Math.random() * available.length)])
          }
        }

        // Change direction occasionally
        if (Math.random() < 0.02) {
          setDirIndex((i) => i + 1)
        }

        return newSegments
      })
    }, 400)

    return () => clearInterval(interval)
  }, [dirIndex, food])

  return (
    <Container>
      {segments.map((seg, i) => {
        const color = getColor(segments, i, skin)
        return (
          <Segment
            key={`${seg.x}-${seg.y}-${i}`}
            $color={color}
            $ghost={false}
            layout
            layoutId={`preview-snake-${i}`}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              left: `${(seg.x / PREVIEW_SIZE) * 100}%`,
              top: `${(seg.y / PREVIEW_SIZE) * 100}%`,
              width: `${100 / PREVIEW_SIZE}%`,
              height: `${100 / PREVIEW_SIZE}%`,
            }}
          />
        )
      })}
      <FoodDot
        key={`food-${food.x}-${food.y}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{
          left: `${(food.x / PREVIEW_SIZE) * 100}%`,
          top: `${(food.y / PREVIEW_SIZE) * 100}%`,
          width: `${100 / PREVIEW_SIZE}%`,
          height: `${100 / PREVIEW_SIZE}%`,
        }}
      />
    </Container>
  )
}
