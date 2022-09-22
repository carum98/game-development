const canvas = document.querySelector('#container')
const select = document.querySelector('#select-state')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

canvas.style.border = '1px solid'

let PLAYER_WIDTH = 0
let PLAYER_HEIGHT = 0

const animations = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 10
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getIt',
    frames: 4
  }
]

let sprites = []
let state = 'idle'

animations.forEach(element => {
  const option = document.createElement('option')
  
  option.value = element.name
  option.innerText = element.name

  select.appendChild(option)
})

select.addEventListener('change', (e) => {
  state = e.target.value
})

const player = new Image()
player.src = './assets/shadow_dog.png'

player.onload = () => {
  PLAYER_WIDTH = (player.width / 12) + 2
  PLAYER_HEIGHT = player.height / 10

  animations.forEach(function({ name, frames }, position) {
    const loc = []

    for (let i = 0; i < frames; i++) {
      const x = i * PLAYER_WIDTH
      const y = position * PLAYER_HEIGHT

      loc.push({x, y})
    }

    sprites[name] = loc
  })

  animate()
}

let gameFrame = 0
const staggerFrame = 5

function animate() {
  const frames = sprites[state]
  const position = Math.floor(gameFrame / staggerFrame) % frames.length

  const { x: frameX, y: frameY } = frames[position]

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.drawImage(player, frameX, frameY, PLAYER_WIDTH, PLAYER_HEIGHT, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT)

  gameFrame++
  requestAnimationFrame(animate)
}

