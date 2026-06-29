# 🐍 SNAKE — Arcade Edition

> *Il classico Snake reinventato con pixel art, effetti glitch e animazioni fluide.*

![screenshot](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![screenshot](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![screenshot](https://img.shields.io/badge/Framer%20Motion-12-00D8FF?logo=framer)
![screenshot](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## ✨ Caratteristiche

- **3 modalità di gioco**: Classico, Power-up 3, Power-up 5
- **Skin personalizzabili**: colore solido, gradiente, o pattern a strisce/scacchiera/casuale
- **Power-up**: velocità 🚀, lento 🐢, scudo 🛡️, magnete 🧲, fantasma 👻
- **Cibo dorato** ⭐ che appare ogni 5 cibi mangiati (50pt)
- **Sistema combo**: moltiplicatore x1 → x5 mangiando velocemente
- **Record salvato** in localStorage
- **Griglia adattiva**: 15×15, 20×20 o 25×25
- **Icone pixel art** per ogni oggetto, disegnate a mano pixel per pixel
- **Font arcade** Press Start 2P + effetto glitch/tremolio CRT
- **Anteprima live** del serpente nel menu
- **Design responsive**: desktop 2 colonne, mobile 1 colonna
- **Pausa** con ESC

## 🎮 Controlli

| Tasto | Azione |
|-------|--------|
| ↑ / W | Su |
| ↓ / S | Giù |
| ← / A | Sinistra |
| → / D | Destra |
| ESC | Pausa / Riprendi |

## 🚀 Installazione

```bash
npm install
npm run dev
```

Build per produzione:

```bash
npm run build
npm run preview
```

## 🧩 Power-up

| Icona | Nome | Effetto | Durata |
|-------|------|---------|--------|
| 🚀 | Velocità | Aumenta la velocità del serpente | 10s |
| 🐢 | Lento | Rallenta il serpente | 10s |
| 🛡️ | Scudo | Assorbe 1 collisione | ∞ (finché usato) |
| 🧲 | Magnete | Attira il cibo più vicino nel raggio di 3 celle | 8s |
| 👻 | Fantasma | Passa attraverso i muri 1 volta | ∞ (finché usato) |

## 🎨 Skin

- **Solido**: un colore a scelta
- **Gradiente**: fino a 5 colori con transizione fluida testa→coda
- **Strisce**: pattern alternato — strisce, scacchiera o casuale

Tutte le skin hanno preset predefiniti e color picker personalizzato.

## 🛠️ Stack

- [React 19](https://react.dev)
- [TypeScript 6](https://www.typescriptlang.org)
- [Framer Motion 12](https://www.framer.com/motion)
- [Styled Components 6](https://styled-components.com)
- [Vite 8](https://vitejs.dev)

## 📁 Struttura

```
src/
├── types/          # Tipi e costanti
├── styles/         # Tema colori e font
├── utils/          # Logica di gioco pura
├── hooks/          # React hooks custom
├── components/
│   ├── Menu/       # Schermata iniziale + anteprima
│   ├── GameBoard/  # Griglia, serpente, cibo
│   ├── HUD/        # Punteggio, combo, power-up timer
│   ├── GameOver/   # Schermata fine gioco
│   └── shared/     # PixelIcon, Button, Selector, ColorPicker
└── App.tsx         # Orchestrazione stati e game loop
```
