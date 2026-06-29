import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import type { GridItem } from '../../types/game'
import { POWERUP_EMOJI } from '../../types/game'

interface FoodProps {
  items: GridItem[]
  gridSize: number
}

const FoodItem = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70%;
  pointer-events: none;
  z-index: 3;
`

const Emoji = styled(motion.span)`
  display: block;
  line-height: 1;
`

const FOOD_EMOJI: Record<string, string> = {
  food: '🍎',
  'golden-food': '⭐',
}

function getEmoji(item: GridItem): string {
  if (item.type in FOOD_EMOJI) return FOOD_EMOJI[item.type]
  return POWERUP_EMOJI[item.type as keyof typeof POWERUP_EMOJI] || '?'
}

export function Food({ items, gridSize }: FoodProps) {
  return (
    <AnimatePresence>
      {items.map((item, index) => {
        const emoji = getEmoji(item)
        return (
          <FoodItem
            key={`${item.type}-${item.position.x}-${item.position.y}-${index}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 15,
              },
            }}
            exit={{
              scale: [1, 1.3, 0],
              rotate: [0, 180, 360],
              opacity: [1, 1, 0],
              transition: { duration: 0.4 },
            }}
            style={{
              left: `${(item.position.x / gridSize) * 100}%`,
              top: `${(item.position.y / gridSize) * 100}%`,
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
            }}
          >
            <Emoji
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </Emoji>
          </FoodItem>
        )
      })}
    </AnimatePresence>
  )
}
