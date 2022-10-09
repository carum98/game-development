class Layer {
  constructor(image, speedModifier) {
    this.width = image.width
    this.height = image.height
    this.speedModifier = speedModifier
    this.image = image

    this.x = 0
    this.y = 0
  }

  update(speed) {
    if (this.x < -this.width) {
      this.x = 0
    } else {
      this.x -= speed * this.speedModifier
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}

export class Background {
  constructor(layers) {
    this.layers = [
      new Layer(layers[0], 0),
      new Layer(layers[1], 0.2),
      new Layer(layers[2], 0.4),
      new Layer(layers[3], 0.8),
      new Layer(layers[4], 1),
    ]
  }

  update(speed) {
    this.layers.forEach(item => {
      item.update(speed)
    })
  }

  draw(ctx) {
    this.layers.forEach(item => {
      item.draw(ctx)
    })
  }
}
