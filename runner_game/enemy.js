class Enemy {
  constructor(image, maxFrame) {
    this.x = 0
    this.y = 0

    this.maxFrame = maxFrame

    this.image = image
    this.width = this.image.width / this.maxFrame
    this.height = this.image.height

    this.frameX = 0
    this.frameY = 0

    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    this.speed = 2

    this.delete = false
  }

  update(deltaTime) {
    if (this.timer > this.interval) {
      this.timer = 0
      if (this.frameX < this.maxFrame - 1) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.timer += deltaTime
    }

    this.x -= this.speed

    if (this.x + this.width < 0) {
      this.delete = true
    }
  }

  draw(ctx) {
    // ctx.strokeRect(this.x, this.y, this.width, this.height)

    ctx.drawImage(this.image, this.width * this.frameX, this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  initialPosition(game) {
    this.x = game.canvasWidth 
  }
}

export class FlyEnemy extends Enemy {
  #image = null

  constructor(image) {
    super(image, 6)
    this.#image = image

    this.speed = Math.random() + 1

    this.angle = 0
    this.va = Math.random() * 0.1 + 0.01
  }

  update(deltaTime) {
    super.update(deltaTime)

    this.angle += this.va
    this.y += Math.sin(this.angle)
  }

  initialPosition(game) {
    super.initialPosition(game)
    this.y = Math.random() * game.canvasHeight * 0.5
  }

  clone() {
    return new FlyEnemy(this.#image)
  }
}

export class GroundEnemy extends Enemy {
  #image = null
  #game = null
  
  constructor(image) {
    super(image, 2)

    this.#image = image 
  }

  update(deltaTime) {
    super.update(deltaTime)
    this.speed = this.#game.speed
  }

  initialPosition(game) {
    super.initialPosition(game)

    this.#game = game
    this.y = game.canvasHeight - this.height - 80 
  }

  clone() {
    return new GroundEnemy(this.#image)
  }
}

export class ClimbingEnemy extends Enemy {
  #image = null
  #game = null

  constructor(image) {
    super(image, 6) 
    
    this.#image = image 
    this.speedY = Math.random() > 0.5 ? 1 : -1
  }

  update(deltaTime) {
    super.update(deltaTime)

    if (this.y > this.#game.canvasHeight - this.height - 80) {
      this.speedY *= -1
    }

    if (this.y < -this.height) {
      this.delete = true
    }

    this.y += this.speedY
  }

  draw(ctx) {
    super.draw(ctx)

    ctx.beginPath()
    ctx.moveTo(this.x + this.width / 2, 0)
    ctx.lineTo(this.x + this.width / 2, this.y + 50)
    ctx.stroke()
  }

  initialPosition(game) {
    super.initialPosition(game)
    this.#game = game

    this.y = Math.random() * game.canvasHeight * 0.5
  }

  clone() {
    return new ClimbingEnemy(this.#image)
  }
}


