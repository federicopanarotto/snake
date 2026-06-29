import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Button } from '../shared/Button'
import type { GameStats } from '../../types/game'

interface GameOverProps {
  score: number
  highScore: number
  isNewHighScore: boolean
  stats: GameStats
  onRestart: () => void
  onMenu: () => void
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.darkOverlay};
  backdrop-filter: blur(8px);
  z-index: 100;
`

const Card = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a4e 0%, #0a0a2e 100%);
  border: 2px solid ${({ theme }) => theme.colors.purple};
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 60px rgba(108, 92, 231, 0.3);
`

const Title = styled(motion.h1)`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.arcade};
  animation: glitch 0.3s ease infinite, textGlitch 2s step-end infinite;
`

const ScoreText = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.arcade};
  animation: textGlitch 2s step-end infinite;
`

const NewHighScore = styled(motion.div)`
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0 16px;
  text-shadow: 0 0 20px rgba(255, 217, 61, 0.5);
  font-family: ${({ theme }) => theme.fonts.arcade};
  animation: glitch 0.5s ease infinite;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin: 20px 0 30px;
`

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
`

const StatValue = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.cyan};
  font-family: ${({ theme }) => theme.fonts.arcade};
`

const StatLabel = styled.div`
  font-size: 0.45rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.glitch};
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`

export function GameOver({ score, highScore, isNewHighScore, stats, onRestart, onMenu }: GameOverProps) {
  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    return `${m}:${(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Title
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Game Over
        </Title>

        <ScoreText
          key={score}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          {score}
        </ScoreText>

        {isNewHighScore && (
          <NewHighScore
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          >
            🎉 Nuovo Record! 🎉
          </NewHighScore>
        )}

        <StatsGrid>
          <StatItem>
            <StatValue>{stats.foodEaten}</StatValue>
            <StatLabel>Cibi</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{stats.powerupsCollected}</StatValue>
            <StatLabel>Power-up</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{formatDuration(stats.duration)}</StatValue>
            <StatLabel>Durata</StatLabel>
          </StatItem>
        </StatsGrid>

        <ButtonRow>
          <Button variant="primary" size="medium" onClick={onRestart}>
            Rigioca
          </Button>
          <Button variant="secondary" size="medium" onClick={onMenu}>
            Menu
          </Button>
        </ButtonRow>
      </Card>
    </Overlay>
  )
}
