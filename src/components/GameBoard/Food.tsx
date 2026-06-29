import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import type { GridItem } from '../../types/game'
import { PixelIcon } from '../shared/PixelIcon'

interface FoodProps {
  items: GridItem[]
  gridSize: number
}

const FoodItem = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
`

export function Food({ items, gridSize }: FoodProps) {
  return (
    <AnimatePresence>
      {items.map((item, index) => (
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
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              height: '80%',
            }}
          >
            <PixelIcon type={item.type} size={100} />
          </motion.div>
        </FoodItem>
      ))}
    </AnimatePresence>
  )
}
