import { Player } from './player.js'
import { Input } from './input.js'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight - 10

const image = new Image()
image.src = './assets/dog_left_right_white.png'

window.addEventListener('load', () => {
  const loading = document.querySelector('#loading')
  loading.style.display = 'none'

  const player = new Player(image, canvas.width, canvas.height)
  const input = new Input()

  let lastTime = 0

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    player.update(input.lastKey)
    player.draw(ctx, deltaTime)
    
    requestAnimationFrame(animate)
  }

  animate(0)
})
