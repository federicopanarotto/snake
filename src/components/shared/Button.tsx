import { motion } from 'framer-motion'
import styled from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

const StyledButton = styled(motion.button)<{ $variant: string; $size: string }>`
  font-family: ${({ theme }) => theme.fonts.arcade};
  font-weight: 400;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: box-shadow 0.2s;

  ${({ $size }) =>
    $size === 'large'
      ? 'padding: 18px 52px; font-size: 1.1rem;'
      : $size === 'small'
      ? 'padding: 10px 24px; font-size: 0.7rem;'
      : 'padding: 14px 36px; font-size: 0.85rem;'}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: transparent;
          color: ${theme.colors.textPrimary};
          border: 2px solid ${theme.colors.textSecondary};
        `
      case 'danger':
        return `
          background: ${theme.colors.danger};
          color: white;
        `
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.purple}, ${theme.colors.pink});
          color: white;
          box-shadow: 0 4px 20px rgba(108, 92, 231, 0.4);
        `
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export function Button({
  variant = 'primary',
  size = 'medium',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {children}
    </StyledButton>
  )
}
