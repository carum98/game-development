import { Game } from './src/game.js'
import { Snake } from './src/snake.js'
import { Food } from './src/food.js'
import { Controls } from './src/controls.js'
import { Hub } from "./src/hub.js";

window.onload = () => {
  const cellCount = 15
  const contentSize = 342
  const cellSize = contentSize / cellCount

  const controls = new Controls()
  const snake = new Snake({ size: cellSize, color: '#00FF99' })
  const food = new Food({ size: cellSize, color: '#FF0000' })
  const hub = new Hub({ element: document.querySelector('h1 span') })

  const game = new Game({
    canvas: document.getElementById('canvas'),
    size: contentSize,
    controls,
    snake,
    food,
    hub,
  })

  gameLoop(game)
}

function gameLoop(game) {
  const FPS = 5
  let prevTick = 0

  function animationFrame(timeStamp) {
    requestAnimationFrame(animationFrame)
    if (timeStamp - prevTick < 1000 / FPS) return

    game.update()
    game.draw()

    prevTick = timeStamp
  }

  animationFrame(0)
}
