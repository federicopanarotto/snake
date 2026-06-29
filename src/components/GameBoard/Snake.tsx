import { motion } from 'framer-motion'
import styled from 'styled-components'
import type { Position, SnakeSkin, Direction } from '../../types/game'

interface SnakeProps {
  segments: Position[]
  skin: SnakeSkin
  gridSize: number
  direction: Direction
  shieldActive: boolean
  ghostActive: boolean
}

const SnakeSegment = styled(motion.div)<{
  $isHead: boolean
  $color: string
  $index: number
  $total: number
  $skinType: string
  $shieldActive: boolean
  $ghostActive: boolean
  $gridSize: number
}>`
  position: absolute;
  width: ${({ $gridSize }) => 100 / $gridSize}%;
  height: ${({ $gridSize }) => 100 / $gridSize}%;
  border-radius: ${({ $isHead }) => ($isHead ? '6px' : '4px')};
  background: ${({ $color }) => $color};
  opacity: ${({ $ghostActive }) => ($ghostActive ? 0.6 : 1)};
  box-shadow: ${({ $shieldActive, $color }) =>
    $shieldActive ? `0 0 12px 4px rgba(46, 204, 113, 0.6)` : `0 0 6px ${$color}40`};
  z-index: ${({ $isHead }) => ($isHead ? 2 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeadDot = styled.div<{ $direction: Direction }>`
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  position: absolute;
  ${({ $direction }) => {
    switch ($direction) {
      case 'UP': return 'top: 4px; left: 50%; transform: translateX(-50%);'
      case 'DOWN': return 'bottom: 4px; left: 50%; transform: translateX(-50%);'
      case 'LEFT': return 'left: 4px; top: 50%; transform: translateY(-50%);'
      case 'RIGHT': return 'right: 4px; top: 50%; transform: translateY(-50%);'
    }
  }}
`

function getColor(segments: Position[], index: number, skin: SnakeSkin): string {
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
        case 'checkerboard':
          return colors[Math.floor(index / 2) % colors.length]
        case 'random': {
          const hash = (index * 7 + index * 31) % colors.length
          return colors[Math.abs(hash)]
        }
        case 'stripes':
        default:
          return colors[index % colors.length]
      }
    }
  }
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

export function Snake({ segments, skin, gridSize, direction, shieldActive, ghostActive }: SnakeProps) {
  return (
    <>
      {segments.map((seg, index) => {
        const isHead = index === 0
        const color = getColor(segments, index, skin)
        return (
          <SnakeSegment
            key={index}
            $isHead={isHead}
            $color={color}
            $index={index}
            $total={segments.length}
            $skinType={skin.type}
            $shieldActive={shieldActive}
            $ghostActive={ghostActive}
            $gridSize={gridSize}
            layout
            layoutId={`snake-${index}`}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: segments.length > 10 ? 0.6 : 0.4,
            }}
            style={{
              left: `${(seg.x / gridSize) * 100}%`,
              top: `${(seg.y / gridSize) * 100}%`,
            }}
          >
            {isHead && <HeadDot $direction={direction} />}
          </SnakeSegment>
        )
      })}
    </>
  )
}
