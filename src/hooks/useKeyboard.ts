import { useEffect, useRef } from 'react'
import type { Direction } from '../types/game'

type KeyAction = 'direction' | 'pause'

interface KeyMapping {
  [key: string]: { action: KeyAction; value: Direction | 'pause' }
}

const KEY_MAP: KeyMapping = {
  ArrowUp: { action: 'direction', value: 'UP' },
  ArrowDown: { action: 'direction', value: 'DOWN' },
  ArrowLeft: { action: 'direction', value: 'LEFT' },
  ArrowRight: { action: 'direction', value: 'RIGHT' },
  w: { action: 'direction', value: 'UP' },
  s: { action: 'direction', value: 'DOWN' },
  a: { action: 'direction', value: 'LEFT' },
  d: { action: 'direction', value: 'RIGHT' },
  W: { action: 'direction', value: 'UP' },
  S: { action: 'direction', value: 'DOWN' },
  A: { action: 'direction', value: 'LEFT' },
  D: { action: 'direction', value: 'RIGHT' },
  Escape: { action: 'pause', value: 'pause' },
}

export function useKeyboard(
  onDirection: (dir: Direction) => void,
  onPause: () => void,
  enabled: boolean
) {
  const onDirectionRef = useRef(onDirection)
  const onPauseRef = useRef(onPause)

  useEffect(() => {
    onDirectionRef.current = onDirection
    onPauseRef.current = onPause
  }, [onDirection, onPause])

  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      const mapping = KEY_MAP[e.key]
      if (!mapping) return
      e.preventDefault()

      if (mapping.action === 'direction') {
        onDirectionRef.current(mapping.value as Direction)
      } else if (mapping.action === 'pause') {
        onPauseRef.current()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [enabled])
}
