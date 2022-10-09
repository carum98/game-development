export class Collition {
  constructor(image, game, x, y) {
    this.game = game

    this.image = image
    this.spriteWidth = image.width / 5
    this.spriteHeight = image.height
    
    this.sizeModifier = Math.random() + 0.5

    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier

    this.x = x - this.width * 0.5
    this.y = y - this.width * 0.5
    
    this.frameX = 0
    this.maxFrame = 4

    this.delete = false

    this.fps = Math.random() * 10 + 5
    this.interval = 1000 / this.fps
    this.timer = 0
  }

  update(deltaTime) {
    this.x -= this.game.speed

    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX > this.maxFrame) {
      this.delete = true
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }

}
