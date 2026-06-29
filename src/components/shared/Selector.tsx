import { motion } from 'framer-motion'
import styled from 'styled-components'

interface SelectorOption<T> {
  value: T
  label: string
  description?: string
  emoji?: string
}

interface SelectorProps<T> {
  options: SelectorOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
}

const Container = styled.div`
  margin-bottom: 20px;
`

const Label = styled.h3`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 10px 0;
  font-family: ${({ theme }) => theme.fonts.arcade};
`

const OptionsGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const OptionCard = styled(motion.button)<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? 'rgba(108, 92, 231, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.purple : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 12px 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.glitch};
  text-align: center;
  min-width: 80px;
  flex: 1;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active ? theme.colors.purple : 'rgba(255, 255, 255, 0.3)'};
  }
`

const Emoji = styled.div`
  font-size: 1.5rem;
  margin-bottom: 4px;
`

const OptionLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
`

const OptionDesc = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`

export function Selector<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: SelectorProps<T>) {
  return (
    <Container>
      <Label>{label}</Label>
      <OptionsGrid>
        {options.map((opt) => (
          <OptionCard
            key={String(opt.value)}
            $active={value === opt.value}
            onClick={() => onChange(opt.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {opt.emoji && <Emoji>{opt.emoji}</Emoji>}
            <OptionLabel>{opt.label}</OptionLabel>
            {opt.description && <OptionDesc>{opt.description}</OptionDesc>}
          </OptionCard>
        ))}
      </OptionsGrid>
    </Container>
  )
}
