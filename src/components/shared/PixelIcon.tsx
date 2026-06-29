import styled from 'styled-components'
import type { GridItem } from '../../types/game'

type IconType = GridItem['type']

interface PixelIconProps {
  type: IconType
  size?: number
  className?: string
}

const Svg = styled.svg`
  display: block;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
`

const PIXEL = 2
const V = 16

function Rect({ x, y, color, w = PIXEL, h = PIXEL }: { x: number; y: number; color: string; w?: number; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill={color} shapeRendering="crispEdges" />
}

function FoodIcon() {
  return (
    <>
      <Rect x={6} y={2} color="#e74c3c" />
      <Rect x={7} y={2} color="#27ae60" />
      <Rect x={5} y={3} color="#e74c3c" /><Rect x={6} y={3} color="#e74c3c" /><Rect x={7} y={3} color="#e74c3c" /><Rect x={8} y={3} color="#e74c3c" />
      <Rect x={4} y={4} color="#e74c3c" /><Rect x={5} y={4} color="#e74c3c" /><Rect x={6} y={4} color="#e74c3c" /><Rect x={7} y={4} color="#e74c3c" /><Rect x={8} y={4} color="#e74c3c" /><Rect x={9} y={4} color="#e74c3c" />
      <Rect x={4} y={5} color="#e74c3c" /><Rect x={5} y={5} color="#e74c3c" /><Rect x={6} y={5} color="#e74c3c" /><Rect x={7} y={5} color="#e74c3c" /><Rect x={8} y={5} color="#e74c3c" /><Rect x={9} y={5} color="#e74c3c" />
      <Rect x={4} y={6} color="#e74c3c" /><Rect x={5} y={6} color="#e74c3c" /><Rect x={6} y={6} color="#e74c3c" /><Rect x={7} y={6} color="#e74c3c" /><Rect x={8} y={6} color="#e74c3c" /><Rect x={9} y={6} color="#e74c3c" />
      <Rect x={5} y={7} color="#e74c3c" /><Rect x={6} y={7} color="#e74c3c" /><Rect x={7} y={7} color="#e74c3c" /><Rect x={8} y={7} color="#e74c3c" />
      <Rect x={5} y={8} color="#e74c3c" /><Rect x={6} y={8} color="#e74c3c" /><Rect x={7} y={8} color="#e74c3c" /><Rect x={8} y={8} color="#e74c3c" />
      <Rect x={6} y={9} color="#c0392b" /><Rect x={7} y={9} color="#c0392b" />
      <Rect x={7} y={10} color="#c0392b" /><Rect x={6} y={11} color="#c0392b" /><Rect x={7} y={11} color="#c0392b" />
      <Rect x={6} y={12} color="#c0392b" /><Rect x={7} y={12} color="#c0392b" />
      <Rect x={6} y={2} color="#27ae60" w={1} h={2} />
    </>
  )
}

function GoldenFoodIcon() {
  return (
    <>
      <Rect x={7} y={1} color="#f1c40f" />
      <Rect x={6} y={2} color="#f1c40f" /><Rect x={7} y={2} color="#f1c40f" /><Rect x={8} y={2} color="#f1c40f" />
      <Rect x={5} y={3} color="#f39c12" /><Rect x={6} y={3} color="#f1c40f" /><Rect x={7} y={3} color="#f1c40f" /><Rect x={8} y={3} color="#f1c40f" /><Rect x={9} y={3} color="#f39c12" />
      <Rect x={4} y={4} color="#f1c40f" /><Rect x={5} y={4} color="#f1c40f" /><Rect x={6} y={4} color="#f1c40f" /><Rect x={7} y={4} color="#f1c40f" /><Rect x={8} y={4} color="#f1c40f" /><Rect x={9} y={4} color="#f1c40f" /><Rect x={10} y={4} color="#f1c40f" />
      <Rect x={4} y={5} color="#f1c40f" /><Rect x={5} y={5} color="#f1c40f" /><Rect x={6} y={5} color="#f1c40f" /><Rect x={7} y={5} color="#f1c40f" /><Rect x={8} y={5} color="#f1c40f" /><Rect x={9} y={5} color="#f1c40f" /><Rect x={10} y={5} color="#f1c40f" />
      <Rect x={5} y={6} color="#f1c40f" /><Rect x={6} y={6} color="#f1c40f" /><Rect x={7} y={6} color="#f1c40f" /><Rect x={8} y={6} color="#f1c40f" /><Rect x={9} y={6} color="#f1c40f" />
      <Rect x={6} y={7} color="#f1c40f" /><Rect x={7} y={7} color="#f1c40f" /><Rect x={8} y={7} color="#f1c40f" />
      <Rect x={7} y={8} color="#f1c40f" />
    </>
  )
}

function SpeedIcon() {
  return (
    <>
      <Rect x={9} y={1} color="#f39c12" /><Rect x={10} y={1} color="#f39c12" />
      <Rect x={9} y={2} color="#f39c12" /><Rect x={10} y={2} color="#f39c12" />
      <Rect x={7} y={3} color="#f39c12" /><Rect x={8} y={3} color="#f39c12" /><Rect x={9} y={3} color="#f1c40f" /><Rect x={10} y={3} color="#f1c40f" />
      <Rect x={5} y={4} color="#f39c12" /><Rect x={6} y={4} color="#f39c12" /><Rect x={7} y={4} color="#f1c40f" /><Rect x={8} y={4} color="#f1c40f" />
      <Rect x={4} y={5} color="#f39c12" /><Rect x={5} y={5} color="#f1c40f" /><Rect x={6} y={5} color="#f1c40f" />
      <Rect x={4} y={6} color="#f1c40f" /><Rect x={5} y={6} color="#f1c40f" />
      <Rect x={5} y={7} color="#f39c12" /><Rect x={6} y={7} color="#f39c12" />
      <Rect x={5} y={8} color="#f39c12" /><Rect x={6} y={8} color="#f39c12" /><Rect x={7} y={8} color="#f39c12" />
      <Rect x={5} y={9} color="#f39c12" /><Rect x={6} y={9} color="#f39c12" /><Rect x={7} y={9} color="#f39c12" /><Rect x={8} y={9} color="#f39c12" />
      <Rect x={5} y={10} color="#e74c3c" /><Rect x={6} y={10} color="#e74c3c" />
      <Rect x={5} y={11} color="#e74c3c" /><Rect x={6} y={11} color="#e74c3c" />
      <Rect x={7} y={11} color="#e74c3c" /><Rect x={8} y={11} color="#e74c3c" />
      <Rect x={7} y={12} color="#e74c3c" /><Rect x={8} y={12} color="#e74c3c" />
    </>
  )
}

function SlowIcon() {
  return (
    <>
      <Rect x={5} y={3} color="#27ae60" /><Rect x={6} y={3} color="#27ae60" /><Rect x={7} y={3} color="#27ae60" /><Rect x={8} y={3} color="#27ae60" /><Rect x={9} y={3} color="#27ae60" />
      <Rect x={4} y={4} color="#27ae60" /><Rect x={5} y={4} color="#2ecc71" /><Rect x={6} y={4} color="#2ecc71" /><Rect x={7} y={4} color="#2ecc71" /><Rect x={8} y={4} color="#2ecc71" /><Rect x={9} y={4} color="#2ecc71" /><Rect x={10} y={4} color="#27ae60" />
      <Rect x={3} y={5} color="#27ae60" /><Rect x={4} y={5} color="#2ecc71" /><Rect x={5} y={5} color="#2ecc71" /><Rect x={6} y={5} color="#27ae60" /><Rect x={7} y={5} color="#27ae60" /><Rect x={8} y={5} color="#2ecc71" /><Rect x={9} y={5} color="#2ecc71" /><Rect x={10} y={5} color="#27ae60" /><Rect x={11} y={5} color="#27ae60" />
      <Rect x={3} y={6} color="#27ae60" /><Rect x={4} y={6} color="#2ecc71" /><Rect x={5} y={6} color="#1e8449" /><Rect x={6} y={6} color="#2ecc71" /><Rect x={7} y={6} color="#2ecc71" /><Rect x={8} y={6} color="#1e8449" /><Rect x={9} y={6} color="#2ecc71" /><Rect x={10} y={6} color="#27ae60" />
      <Rect x={3} y={7} color="#27ae60" /><Rect x={4} y={7} color="#2ecc71" /><Rect x={9} y={7} color="#2ecc71" /><Rect x={10} y={7} color="#27ae60" />
      <Rect x={4} y={8} color="#27ae60" /><Rect x={5} y={8} color="#2ecc71" /><Rect x={6} y={8} color="#2ecc71" /><Rect x={7} y={8} color="#2ecc71" /><Rect x={8} y={8} color="#2ecc71" /><Rect x={9} y={8} color="#27ae60" />
      <Rect x={5} y={9} color="#27ae60" /><Rect x={6} y={9} color="#2ecc71" /><Rect x={7} y={9} color="#2ecc71" /><Rect x={8} y={9} color="#27ae60" />
      <Rect x={6} y={10} color="#27ae60" /><Rect x={7} y={10} color="#27ae60" />
    </>
  )
}

function ShieldIcon() {
  return (
    <>
      <Rect x={5} y={2} color="#2980b9" /><Rect x={6} y={2} color="#3498db" /><Rect x={7} y={2} color="#3498db" /><Rect x={8} y={2} color="#3498db" /><Rect x={9} y={2} color="#2980b9" />
      <Rect x={4} y={3} color="#2980b9" /><Rect x={5} y={3} color="#3498db" /><Rect x={6} y={3} color="#85c1e9" /><Rect x={7} y={3} color="#85c1e9" /><Rect x={8} y={3} color="#85c1e9" /><Rect x={9} y={3} color="#3498db" /><Rect x={10} y={3} color="#2980b9" />
      <Rect x={4} y={4} color="#3498db" /><Rect x={5} y={4} color="#85c1e9" /><Rect x={6} y={4} color="#85c1e9" /><Rect x={7} y={4} color="#85c1e9" /><Rect x={8} y={4} color="#85c1e9" /><Rect x={9} y={4} color="#85c1e9" /><Rect x={10} y={4} color="#3498db" />
      <Rect x={4} y={5} color="#3498db" /><Rect x={5} y={5} color="#85c1e9" /><Rect x={6} y={5} color="#85c1e9" /><Rect x={7} y={5} color="#85c1e9" /><Rect x={8} y={5} color="#85c1e9" /><Rect x={9} y={5} color="#85c1e9" /><Rect x={10} y={5} color="#3498db" />
      <Rect x={4} y={6} color="#3498db" /><Rect x={5} y={6} color="#85c1e9" /><Rect x={6} y={6} color="#85c1e9" /><Rect x={7} y={6} color="#85c1e9" /><Rect x={8} y={6} color="#85c1e9" /><Rect x={9} y={6} color="#85c1e9" /><Rect x={10} y={6} color="#3498db" />
      <Rect x={5} y={7} color="#2980b9" /><Rect x={6} y={7} color="#3498db" /><Rect x={7} y={7} color="#3498db" /><Rect x={8} y={7} color="#3498db" /><Rect x={9} y={7} color="#2980b9" />
      <Rect x={6} y={8} color="#2980b9" /><Rect x={7} y={8} color="#3498db" /><Rect x={8} y={8} color="#2980b9" />
      <Rect x={7} y={9} color="#2980b9" />
    </>
  )
}

function MagnetIcon() {
  return (
    <>
      <Rect x={3} y={2} color="#7f8c8d" /><Rect x={4} y={2} color="#95a5a6" /><Rect x={5} y={2} color="#95a5a6" /><Rect x={6} y={2} color="#7f8c8d" />
      <Rect x={3} y={3} color="#95a5a6" /><Rect x={4} y={3} color="#bdc3c7" /><Rect x={5} y={3} color="#bdc3c7" /><Rect x={6} y={3} color="#95a5a6" />
      <Rect x={3} y={4} color="#e74c3c" /><Rect x={4} y={4} color="#e74c3c" /><Rect x={5} y={4} color="#e74c3c" /><Rect x={6} y={4} color="#e74c3c" />
      <Rect x={3} y={5} color="#e74c3c" /><Rect x={4} y={5} color="#e74c3c" /><Rect x={5} y={5} color="#e74c3c" /><Rect x={6} y={5} color="#e74c3c" />
      <Rect x={3} y={6} color="#95a5a6" /><Rect x={4} y={6} color="#95a5a6" /><Rect x={5} y={6} color="#95a5a6" /><Rect x={6} y={6} color="#95a5a6" />
      <Rect x={3} y={7} color="#7f8c8d" /><Rect x={4} y={7} color="#7f8c8d" /><Rect x={5} y={7} color="#7f8c8d" /><Rect x={6} y={7} color="#7f8c8d" />
      <Rect x={8} y={6} color="#7f8c8d" /><Rect x={9} y={6} color="#95a5a6" /><Rect x={10} y={6} color="#95a5a6" /><Rect x={11} y={6} color="#7f8c8d" />
      <Rect x={8} y={7} color="#95a5a6" /><Rect x={9} y={7} color="#bdc3c7" /><Rect x={10} y={7} color="#bdc3c7" /><Rect x={11} y={7} color="#95a5a6" />
      <Rect x={8} y={8} color="#e74c3c" /><Rect x={9} y={8} color="#e74c3c" /><Rect x={10} y={8} color="#e74c3c" /><Rect x={11} y={8} color="#e74c3c" />
      <Rect x={8} y={9} color="#e74c3c" /><Rect x={9} y={9} color="#e74c3c" /><Rect x={10} y={9} color="#e74c3c" /><Rect x={11} y={9} color="#e74c3c" />
      <Rect x={8} y={10} color="#95a5a6" /><Rect x={9} y={10} color="#95a5a6" /><Rect x={10} y={10} color="#95a5a6" /><Rect x={11} y={10} color="#95a5a6" />
      <Rect x={8} y={11} color="#7f8c8d" /><Rect x={9} y={11} color="#7f8c8d" /><Rect x={10} y={11} color="#7f8c8d" /><Rect x={11} y={11} color="#7f8c8d" />
    </>
  )
}

function GhostIcon() {
  return (
    <>
      <Rect x={4} y={2} color="#8e44ad" /><Rect x={5} y={2} color="#9b59b6" /><Rect x={6} y={2} color="#9b59b6" /><Rect x={7} y={2} color="#9b59b6" /><Rect x={8} y={2} color="#9b59b6" /><Rect x={9} y={2} color="#9b59b6" /><Rect x={10} y={2} color="#8e44ad" />
      <Rect x={3} y={3} color="#8e44ad" /><Rect x={4} y={3} color="#9b59b6" /><Rect x={5} y={3} color="#ffffff" /><Rect x={6} y={3} color="#9b59b6" /><Rect x={7} y={3} color="#9b59b6" /><Rect x={8} y={3} color="#ffffff" /><Rect x={9} y={3} color="#9b59b6" /><Rect x={10} y={3} color="#9b59b6" /><Rect x={11} y={3} color="#8e44ad" />
      <Rect x={3} y={4} color="#9b59b6" /><Rect x={4} y={4} color="#9b59b6" /><Rect x={5} y={4} color="#ffffff" /><Rect x={6} y={4} color="#ffffff" /><Rect x={7} y={4} color="#9b59b6" /><Rect x={8} y={4} color="#ffffff" /><Rect x={9} y={4} color="#ffffff" /><Rect x={10} y={4} color="#9b59b6" /><Rect x={11} y={4} color="#9b59b6" />
      <Rect x={3} y={5} color="#9b59b6" /><Rect x={4} y={5} color="#9b59b6" /><Rect x={5} y={5} color="#9b59b6" /><Rect x={6} y={5} color="#9b59b6" /><Rect x={7} y={5} color="#9b59b6" /><Rect x={8} y={5} color="#9b59b6" /><Rect x={9} y={5} color="#9b59b6" /><Rect x={10} y={5} color="#9b59b6" /><Rect x={11} y={5} color="#9b59b6" />
      <Rect x={3} y={6} color="#9b59b6" /><Rect x={4} y={6} color="#9b59b6" /><Rect x={5} y={6} color="#9b59b6" /><Rect x={6} y={6} color="#9b59b6" /><Rect x={7} y={6} color="#9b59b6" /><Rect x={8} y={6} color="#9b59b6" /><Rect x={9} y={6} color="#9b59b6" /><Rect x={10} y={6} color="#9b59b6" /><Rect x={11} y={6} color="#9b59b6" />
      <Rect x={3} y={7} color="#9b59b6" /><Rect x={4} y={7} color="#9b59b6" /><Rect x={5} y={7} color="#9b59b6" /><Rect x={6} y={7} color="#9b59b6" /><Rect x={7} y={7} color="#9b59b6" /><Rect x={8} y={7} color="#9b59b6" /><Rect x={9} y={7} color="#9b59b6" /><Rect x={10} y={7} color="#9b59b6" /><Rect x={11} y={7} color="#9b59b6" />
      <Rect x={3} y={8} color="#9b59b6" /><Rect x={4} y={8} color="#9b59b6" /><Rect x={5} y={8} color="#9b59b6" /><Rect x={6} y={8} color="#9b59b6" /><Rect x={7} y={8} color="#9b59b6" /><Rect x={8} y={8} color="#9b59b6" /><Rect x={9} y={8} color="#9b59b6" /><Rect x={10} y={8} color="#9b59b6" /><Rect x={11} y={8} color="#9b59b6" />
      <Rect x={3} y={9} color="#8e44ad" /><Rect x={4} y={9} color="#9b59b6" /><Rect x={5} y={9} color="#9b59b6" /><Rect x={6} y={9} color="#9b59b6" /><Rect x={7} y={9} color="#9b59b6" /><Rect x={8} y={9} color="#9b59b6" /><Rect x={9} y={9} color="#9b59b6" /><Rect x={10} y={9} color="#9b59b6" /><Rect x={11} y={9} color="#8e44ad" />
      <Rect x={3} y={10} color="#8e44ad" /><Rect x={4} y={10} color="#9b59b6" /><Rect x={5} y={10} color="#8e44ad" /><Rect x={6} y={10} color="#9b59b6" /><Rect x={7} y={10} color="#9b59b6" /><Rect x={8} y={10} color="#8e44ad" /><Rect x={9} y={10} color="#9b59b6" /><Rect x={10} y={10} color="#9b59b6" /><Rect x={11} y={10} color="#8e44ad" />
      <Rect x={4} y={11} color="#8e44ad" /><Rect x={5} y={11} color="#8e44ad" /><Rect x={8} y={11} color="#8e44ad" /><Rect x={9} y={11} color="#8e44ad" />
    </>
  )
}

const ICONS: Record<IconType, React.FC> = {
  food: FoodIcon,
  'golden-food': GoldenFoodIcon,
  speed: SpeedIcon,
  slow: SlowIcon,
  shield: ShieldIcon,
  magnet: MagnetIcon,
  ghost: GhostIcon,
}

export function PixelIcon({ type, size = 16, className }: PixelIconProps) {
  const Icon = ICONS[type]
  if (!Icon) return null
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${V} ${V}`}
      className={className}
    >
      <Icon />
    </Svg>
  )
}
