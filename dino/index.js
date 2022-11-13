import { Game } from './src/game.js'

const canvas = document.getElementById('canvas')

const scale = window.innerWidth / canvas.width
canvas.style.transform = `scale(${scale})`

const game = new Game({
  canvas
})

window.addEventListener('keydown', ({ code }) => {
  if (!game.isPlaying && ['Space', 'ArrowUp'].includes(code)) {
    game.start()
  }
})

