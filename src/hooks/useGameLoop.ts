import { useEffect, useRef } from 'react'

export function useGameLoop(callback: () => void, tickSpeed: number, running: boolean) {
  const callbackRef = useRef(callback)
  const tickSpeedRef = useRef(tickSpeed)

  useEffect(() => {
    callbackRef.current = callback
    tickSpeedRef.current = tickSpeed
  }, [callback, tickSpeed])

  useEffect(() => {
    if (!running) return

    let lastTime = 0
    let accumulator = 0
    let animationId: number

    const loop = (time: number) => {
      if (!running) return
      const delta = time - lastTime
      lastTime = time
      accumulator += delta

      while (accumulator >= tickSpeedRef.current) {
        callbackRef.current()
        accumulator -= tickSpeedRef.current
      }

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame((time) => {
      lastTime = time
      loop(time)
    })

    return () => cancelAnimationFrame(animationId)
  }, [running])
}
