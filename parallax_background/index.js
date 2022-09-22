const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

let gameSpeed = 5

const backgroudLayer1 = new Image()
backgroudLayer1.src = './assets/layer-1.png'
const backgroudLayer2 = new Image()
backgroudLayer2.src = './assets/layer-2.png'
const backgroudLayer3 = new Image()
backgroudLayer3.src = './assets/layer-3.png'
const backgroudLayer4 = new Image()
backgroudLayer4.src = './assets/layer-4.png'
const backgroudLayer5 = new Image()
backgroudLayer5.src = './assets/layer-5.png'

class Layer {
  constructor(image, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  update() {
    this.speed = gameSpeed * this.speedModifier

    if (this.x <= -this.width) {
      this.x = 0
    }

    this.x = Math.floor(this.x - this.speed)
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}

const layer1 = new Layer(backgroudLayer1, 0.2)
const layer2 = new Layer(backgroudLayer2, 0.4)
const layer3 = new Layer(backgroudLayer3, 0.6)
const layer4 = new Layer(backgroudLayer4, 0.8)
const layer5 = new Layer(backgroudLayer5, 1)

const layers = [layer1, layer2, layer3, layer4, layer5]

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  layers.forEach((element) => {
    element.update()
    element.draw()
  })

  requestAnimationFrame(animate)
}

animate()

