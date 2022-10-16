import { withGrid } from "./util.js"

export class Sprite {
  constructor(config) {
    this.isLoaded = false
    this.isShadowLoaded = false
    this.useShadow = true
    this.gameObject = config.gameObject

    // Sprite image
    this.image = new Image()
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true
    }

    // Shadow image
    this.shadow = new Image()
    if (this.useShadow) {
      this.shadow.src = './assets/characters/shadow.png'
      this.shadow.onload = () => {
        this.isShadowLoaded = true
      }
    }

    // Animations
    this.animations = config.animations || {
      'idle-down': [ [0, 0] ],
      'idle-right': [ [0, 1] ],
      'idle-up': [ [0, 2] ],
      'idle-left': [ [0, 3] ],
      'walk-down': [ [1, 0], [0, 0], [3, 0], [0, 0] ],
      'walk-right': [ [1, 1], [0, 1], [3, 1], [0, 1] ],
      'walk-up': [ [1, 2], [0, 2], [3, 2], [0, 2] ],
      'walk-left': [ [1, 3], [0, 3], [3, 3], [0, 3] ]
    }

    this.currentAnimation = config.currentAnimation || 'idle-down'
    this.currentAnimationFrame = 0

    this.animationFrameLimit = config.animationFrameLimit || 4
    this.animationFrameProgress = this.animationFrameLimit
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(animation) {
    if (this.currentAnimation !== animation) {
      this.currentAnimation = animation
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }

    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame += 1

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + withGrid(10.5) - cameraPerson.x 
    const y = this.gameObject.y - 18 + withGrid(6) - cameraPerson.y

    if (this.isShadowLoaded) {
      ctx.drawImage(this.shadow, x, y)
    }

    if (this.isLoaded) {
      const [frameX, frameY] = this.frame

      ctx.drawImage(this.image,
        frameX * 32, frameY * 32,
        32, 32,
        x, y,
        32, 32
      )
    }

    this.updateAnimationProgress()
  }
}
