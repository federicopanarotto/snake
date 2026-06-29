export const theme = {
  colors: {
    background: '#0a0a2e',
    gridLine: '#1a1a5e',
    gridCell: '#0f0f3a',
    primary: '#ff6b6b',
    secondary: '#ffd93d',
    accent: '#6bcb77',
    purple: '#6c5ce7',
    cyan: '#00cec9',
    pink: '#fd79a8',
    orange: '#f39c12',
    darkOverlay: 'rgba(0, 0, 0, 0.7)',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0c0',
    danger: '#e74c3c',
    success: '#2ecc71',
    warning: '#f1c40f',
  },
  snakePresets: [
    { label: 'Fiamma', colors: ['#ff6b6b', '#ffd93d'] },
    { label: 'Oceano', colors: ['#6c5ce7', '#00cec9'] },
    { label: 'Foresta', colors: ['#6bcb77', '#ffd93d'] },
    { label: 'Tramonto', colors: ['#ff6b6b', '#6c5ce7'] },
    { label: 'Arcobaleno', colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#00cec9', '#6c5ce7'] },
    { label: 'Neon', colors: ['#ff6b6b', '#00cec9'] },
  ],
  fonts: {
    arcade: "'Press Start 2P', monospace",
    glitch: "'VT323', monospace",
    mono: "'Courier New', monospace",
  },
  shadows: {
    glow: '0 0 20px rgba(108, 92, 231, 0.4)',
    glowStrong: '0 0 40px rgba(255, 107, 107, 0.6)',
  },
}

export type Theme = typeof theme
