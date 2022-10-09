class Particle {
  constructor(x, y) {
    this.delete = false

    this.x = x
    this.y = y

    this.speedX = Math.random()
    this.speedY = Math.random()
  }

  update() {
    this.x -= this.speedX + 3
    this.y -= this.speedY

    this.size *= 0.97

    if (this.size < 0.5) {
      this.delete = true
    }
  }
}

export class Dust extends Particle {
  constructor(x, y) {
    super(x, y)

    this.size = Math.random() * 10 + 10
    this.color = 'rgba(0,0,0,0.2)'
  }

  clone(player) {
    const x = player.x + player.width * 0.3
    const y = player.y + player.height

    return new Dust(x, y)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

export class Fire extends Particle {
  #image = null

  constructor(image, x, y) {
    super(x, y)

    this.#image = image

    this.size = Math.random() * 100 + 50

    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
  }

  update() {
    super.update()

    this.angle += this.va
    this.x += Math.sin(this.angle * 5)
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(this.#image, -this.size * 0.5, -this.size * 0.6, this.size, this.size)
    ctx.restore()
  }

  clone(player) {
    const x = player.x + player.width * 0.5
    const y = player.y + player.height
    
    return new Fire(this.#image, x, y)
  }
}


