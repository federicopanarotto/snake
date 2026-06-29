import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import type { ActiveEffect, GameMode } from '../../types/game'
import { POWERUP_LABELS, POWERUP_DURATION } from '../../types/game'
import { PixelIcon } from '../shared/PixelIcon'

interface HUDProps {
  score: number
  highScore: number
  combo: number
  speed: number
  mode: GameMode
  activeEffects: ActiveEffect[]
  foodEaten: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ScoreGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`

const Score = styled(motion.div)`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.arcade};
  animation: textGlitch 3s step-end infinite;
`

const HighScore = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Combo = styled(motion.div)`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pink};
`

const ModeLabel = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.fonts.glitch};
`

const PowerUpBar = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const PowerUpBadge = styled(motion.div)<{ $type: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case 'speed': return 'rgba(255, 107, 107, 0.3)'
      case 'slow': return 'rgba(52, 152, 219, 0.3)'
      case 'shield': return 'rgba(46, 204, 113, 0.3)'
      case 'magnet': return 'rgba(241, 196, 15, 0.3)'
      case 'ghost': return 'rgba(155, 89, 182, 0.3)'
      default: return 'rgba(255,255,255,0.1)'
    }
  }};
  border: 1px solid ${({ $type, theme }) => {
    switch ($type) {
      case 'speed': return theme.colors.primary
      case 'slow': return '#3498db'
      case 'shield': return theme.colors.success
      case 'magnet': return theme.colors.warning
      case 'ghost': return '#9b59b6'
      default: return 'transparent'
    }
  }};
`

const TimerBar = styled(motion.div)<{ $type: string }>`
  height: 3px;
  border-radius: 2px;
  background: ${({ $type }) => {
    switch ($type) {
      case 'speed': return '#ff6b6b'
      case 'slow': return '#3498db'
      case 'shield': return '#2ecc71'
      case 'magnet': return '#f1c40f'
      case 'ghost': return '#9b59b6'
      default: return 'white'
    }
  }};
`

export function HUD({ score, highScore, combo, speed, mode, activeEffects, foodEaten }: HUDProps) {
  const modeLabel = mode === 'classic' ? 'Classico' : mode === 'powerups-3' ? 'Power-up 3' : 'Power-up 5'

  return (
    <Container>
      <TopRow>
        <ScoreGroup>
          <Score
            key={score}
            initial={{ scale: 1.3, color: '#ffd93d' }}
            animate={{ scale: 1, color: '#ffd93d' }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {score}
          </Score>
          <HighScore>🏆 {highScore}</HighScore>
          {combo > 1 && (
            <Combo
              key={combo}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              x{combo}
            </Combo>
          )}
        </ScoreGroup>
        <ModeLabel>{modeLabel} | <PixelIcon type="food" size={12} /> {foodEaten}</ModeLabel>
      </TopRow>

      <AnimatePresence>
        {activeEffects.length > 0 && (
          <PowerUpBar>
            {activeEffects.map((effect) => {
              const remaining = Math.max(0, effect.expiresAt - Date.now())
              const pct = (remaining / POWERUP_DURATION) * 100
              return (
                <PowerUpBadge
                  key={effect.type}
                  $type={effect.type}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                >
                  <PixelIcon type={effect.type} size={14} /> {POWERUP_LABELS[effect.type]}
                  <TimerBar $type={effect.type} style={{ width: `${pct}px` }} />
                </PowerUpBadge>
              )
            })}
          </PowerUpBar>
        )}
      </AnimatePresence>
    </Container>
  )
}
