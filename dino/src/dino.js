import { DIRECTION } from "./controls.js"

const DINO_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  JUMPING: 'jumping',
  DOWN: 'down',
  DEAD: 'dead'
}

export class Dino {
  constructor(sprite) {
    this.sprite = sprite.dino()

    this.x = 25
    this.y = 100

    this.vy = 0
    this.weight = 0.8

    this.frame = 0
    this.maxFrame = 1

    this.status = DINO_STATES.IDLE

    this.interval = 150
    this.timer = 0
  }

  update(controls, deltaTime) {
    this.y += this.vy

    if (!this.onGround) {
      this.vy += this.weight

      this.status = DINO_STATES.JUMPING
    } else {
      this.vy = 0
      this.y = 100

      this.status = DINO_STATES.RUNNING
    }

    if (controls.direction === DIRECTION.UP && this.onGround) {
      this.vy -= 12
    }

    this.maxFrame = this.sprite.status[this.status].frames

    if (this.timer > this.interval) {
      if (this.frame >= this.maxFrame - 1) {
        this.frame = 0
      } else {
        this.frame++
      }

      this.timer = 0
    } else {
      this.timer += deltaTime
    }
  }

  draw(ctx) {
    const { img, height, spriteWidth, scale, status } = this.sprite
    const { x, y } = status[this.status]

    ctx.drawImage(img, x + (spriteWidth * this.frame), y, spriteWidth, height, this.x, this.y, spriteWidth / scale, spriteWidth / scale)
  }

  isDead(ctx) {
    this.status = DINO_STATES.DEAD
    this.draw(ctx)
  }

  get onGround() {
    return this.y >= 100
  }
}
