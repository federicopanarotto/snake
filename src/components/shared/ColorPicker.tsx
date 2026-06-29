import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface ColorPickerProps {
  colors: string[]
  onChange: (colors: string[]) => void
  maxColors?: number
}

const Container = styled.div`
  margin: 10px 0;
`

const SectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`

const PresetGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

const PresetButton = styled(motion.button)<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? 'rgba(108, 92, 231, 0.2)' : 'transparent'};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.purple : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`

const ColorStrip = styled.div`
  display: flex;
  gap: 2px;
`

const ColorDot = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const PresetLabel = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.75rem;
`

const ColorInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`

const StyledInput = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  padding: 0;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }
`

const ColorLabel = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.85rem;
`

const AddButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`

const presets = theme.snakePresets.map((p) => ({ label: p.label, colors: p.colors }))

export function ColorPicker({ colors, onChange, maxColors = 5 }: ColorPickerProps) {
  const isPresetActive = (preset: string[]) =>
    preset.length === colors.length && preset.every((c, i) => c === colors[i])

  const updateColor = (index: number, newColor: string) => {
    const next = [...colors]
    next[index] = newColor
    onChange(next)
  }

  return (
    <Container>
      <SectionTitle>Colori</SectionTitle>
      <PresetGrid>
        {presets.map((preset) => (
          <PresetButton
            key={preset.label}
            $active={isPresetActive(preset.colors)}
            onClick={() => onChange([...preset.colors])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ColorStrip>
              {preset.colors.map((c, i) => (
                <ColorDot key={i} $color={c} />
              ))}
            </ColorStrip>
            <PresetLabel>{preset.label}</PresetLabel>
          </PresetButton>
        ))}
      </PresetGrid>

      {colors.map((color, index) => (
        <ColorInputRow key={index}>
          <StyledInput
            type="color"
            value={color}
            onChange={(e) => updateColor(index, e.target.value)}
          />
          <ColorLabel>
            Colore {index + 1}
          </ColorLabel>
        </ColorInputRow>
      ))}

      {colors.length < maxColors && (
        <AddButton
          onClick={() => onChange([...colors, '#ff6b6b'])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Aggiungi colore
        </AddButton>
      )}
    </Container>
  )
}
