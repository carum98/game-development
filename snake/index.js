import { Game, STATES } from './src/game.js'
import { Snake } from './src/snake.js'
import { Food } from './src/food.js'
import { Controls } from './src/controls.js'
import { Hub } from "./src/hub.js"

const hub = new Hub()

hub.menu.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const formProps = Object.fromEntries(formData)

  startGame(formProps)
    
  hub.menuModal.close()
})

function startGame({ cell_count, snake_color, food_color, speed, collition }) {
  const contentSize = 342
  const cellSize = contentSize / cell_count 

  const controls = new Controls()

  const snake = new Snake({
    size: cellSize,
    color: snake_color
  })

  const food = new Food({ 
    size: cellSize,
    color: food_color
  })

  const game = new Game({
    size: contentSize,
    controls,
    snake,
    food,
    speed,
    hub,
    collition
  })

  hub.pause.addEventListener('click', async (_) => {
    try {
      game.state = STATES.PAUSED
      await hub.showPause()
      game.state = STATES.RUNNING
    } catch (error) {
      game.state = STATES.RESET
    }
  })
}
