import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Selector } from '../shared/Selector'
import { ColorPicker } from '../shared/ColorPicker'
import { Button } from '../shared/Button'
import { SnakePreview } from './SnakePreview'
import type { GameConfig, SnakeSkinType, StripedPattern, GameMode } from '../../types/game'

interface MenuProps {
  config: GameConfig
  onConfigChange: (config: GameConfig) => void
  onStart: () => void
  highScore: number
}

const PageWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  gap: 16px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.purple},
    ${({ theme }) => theme.colors.cyan}
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite, glitch 0.3s ease infinite, textGlitch 2s step-end infinite;
  font-family: ${({ theme }) => theme.fonts.arcade};

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.7rem;
  margin: -4px 0 0 0;
  font-family: ${({ theme }) => theme.fonts.glitch};
  animation: flicker 3s step-end infinite;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`

const HighScoreDisplay = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.secondary};
`

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 20px;

  @media (max-width: 900px) {
    position: static;
  }
`

const Section = styled(motion.div)`
  width: 100%;
`

const SkinSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
`

const PreviewWrapper = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const PreviewLabel = styled.div`
  font-size: 0.55rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: ${({ theme }) => theme.fonts.arcade};
`

const HideOnMobile = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`

const ShowOnMobile = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`

export function Menu({ config, onConfigChange, onStart, highScore }: MenuProps) {
  const [skinTab, setSkinTab] = useState<SnakeSkinType>(config.skin.type)

  const updateSkin = (partial: Partial<GameConfig['skin']>) => {
    onConfigChange({
      ...config,
      skin: { ...config.skin, ...partial },
    })
  }

  const handleSkinTypeChange = (type: SnakeSkinType) => {
    setSkinTab(type)
    const colors =
      type === 'solid'
        ? [config.skin.colors[0] || '#ff6b6b']
        : type === 'gradient'
        ? [config.skin.colors[0] || '#ff6b6b', config.skin.colors[1] || '#6c5ce7']
        : [config.skin.colors[0] || '#ff6b6b', config.skin.colors[1] || '#ffd93d']
    updateSkin({ type, colors, pattern: type === 'striped' ? config.skin.pattern || 'stripes' : undefined })
  }

  const skinControls = (
    <>
      <Selector<SnakeSkinType>
        label="Stile"
        value={skinTab}
        onChange={handleSkinTypeChange}
        options={[
          { value: 'solid', label: 'Solido', emoji: '🔴' },
          { value: 'gradient', label: 'Gradiente', emoji: '🌈' },
          { value: 'striped', label: 'Strisce', emoji: '🦓' },
        ]}
      />

      <ColorPicker
        colors={config.skin.colors}
        onChange={(colors) => updateSkin({ colors })}
        maxColors={skinTab === 'solid' ? 1 : skinTab === 'gradient' ? 5 : 5}
      />

      {skinTab === 'striped' && (
        <Selector<StripedPattern>
          label="Pattern"
          value={config.skin.pattern || 'stripes'}
          onChange={(pattern) => updateSkin({ pattern })}
          options={[
            { value: 'stripes', label: 'Strisce', emoji: '〰️' },
            { value: 'checkerboard', label: 'Scacchiera', emoji: '🏁' },
            { value: 'random', label: 'Casuale', emoji: '🎲' },
          ]}
        />
      )}
    </>
  )

  return (
    <PageWrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          SNAKE
        </Title>
        <Subtitle>Il classico reinventato</Subtitle>
        {highScore > 0 && <HighScoreDisplay>🏆 Record: {highScore}</HighScoreDisplay>}
      </Header>

      <MainLayout>
        <LeftColumn>
          <Section
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Selector<GameMode>
              label="🎮 Modalità"
              value={config.mode}
              onChange={(mode) => onConfigChange({ ...config, mode })}
              options={[
                { value: 'classic', label: 'Classico', description: 'Solo cibo' },
                { value: 'powerups-3', label: 'Power-up 3', description: 'Velocità, Lento, Scudo' },
                { value: 'powerups-5', label: 'Power-up 5', description: 'Tutti i power-up!' },
              ]}
            />
          </Section>

          <Section
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Selector<15 | 20 | 25>
              label="📐 Griglia"
              value={config.gridSize}
              onChange={(gridSize) => onConfigChange({ ...config, gridSize })}
              options={[
                { value: 15, label: '15×15', description: 'Veloce' },
                { value: 20, label: '20×20', description: 'Classico' },
                { value: 25, label: '25×25', description: 'Lunga' },
              ]}
            />
          </Section>

          <ShowOnMobile>
            <SkinSection>
              {skinControls}
            </SkinSection>
          </ShowOnMobile>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: 'center' }}
          >
            <Button variant="primary" size="large" onClick={onStart}>
              Inizia
            </Button>
          </motion.div>
        </LeftColumn>

        <HideOnMobile>
          <RightColumn>
            <SkinSection
              as={motion.div}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {skinControls}
            </SkinSection>

            <PreviewWrapper
              as={motion.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <PreviewLabel>🐍 Anteprima live</PreviewLabel>
              <SnakePreview skin={config.skin} />
            </PreviewWrapper>
          </RightColumn>
        </HideOnMobile>
      </MainLayout>
    </PageWrapper>
  )
}
