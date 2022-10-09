import { Game } from './game.js'
import { Player } from './player.js'
import { Input } from './input.js'
import { Background } from './background.js'
import { StatesPlayer, states } from './state.js'
import { FlyEnemy, GroundEnemy, ClimbingEnemy } from './enemy.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 900
canvas.height = 500

const image = new Image()
image.src = './assets/player.png'

const layer1 = new Image()
layer1.src = './assets/layer-1.png'

const layer2 = new Image()
layer2.src = './assets/layer-2.png'

const layer3 = new Image()
layer3.src = './assets/layer-3.png'

const layer4 = new Image()
layer4.src = './assets/layer-4.png'

const layer5 = new Image()
layer5.src = './assets/layer-5.png'

const flyEnemy = new Image()
flyEnemy.src = './assets/enemy_fly.png'

const plantEnemy = new Image()
plantEnemy.src = './assets/enemy_plant.png'

const spiderEnemy = new Image()
spiderEnemy.src = './assets/enemy_spider_big.png'

const boomImage = new Image()
boomImage.src = './assets/boom.png'

window.addEventListener('load', () => {
  const layerImage = [layer1, layer2, layer3, layer4, layer5]

  const input = new Input()

  const player = new Player(image, canvas.width, canvas.height)
  const background = new Background(layerImage)

  const enemies = [
    {
      name: 'Fly',
      instance: new FlyEnemy(flyEnemy)
    },
    {
      name: 'Plant',
      instance: new GroundEnemy(plantEnemy)
    },
    {
      name: 'Spider',
      instance: new ClimbingEnemy(spiderEnemy)
    }
  ]

  const game = new Game(player, background, boomImage, enemies, canvas.width, canvas.height)

  const status = new StatesPlayer(game)
  player.states = status
  player.currentState = status[states.SITTING]

  let lastTime = 0

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    game.update(input, deltaTime)
    game.draw(ctx)

    if (!game.gameOver) {
     requestAnimationFrame(animate)
    }
  }

  animate(0)
})
