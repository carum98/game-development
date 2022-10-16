import { GameObject } from './game_object.js'
import { emitEvent } from "./util.js";

const DIRECTIONS = {
  'up': ['y', -1],
  'down': ['y', 1],
  'left': ['x', -1],
  'right': ['x', 1]
}

export class Person extends GameObject {
  constructor(config) {
    super(config)

    this.isPlayerController = config.isPlayerController || false

    this.movingProgressRemaining = 0
    this.direction = 'down'

    this.isStading = false
  }
  
  update(direction, map) {

    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {
      if (!map.isCutscenePlaying && this.isPlayerController && direction) {
        this.startBehavior(map, {
          direction,
          behavior: 'walk'
        })
      }

      this.updateSprite()
    }
  }

  updatePosition() {
    const [axis, value] = DIRECTIONS[this.direction]
    this[axis] += value
    this.movingProgressRemaining -= 1

    if (this.movingProgressRemaining === 0) {
      emitEvent('PersonWalkingComplete', { whoId: this.id })     
    }
  }

  startBehavior(map, { behavior, direction, time, retry }) {
    this.direction = direction

    if (behavior === 'walk') {
      if (map.isSpaceTaken(this.x, this.y, this.direction)) {
        retry && setTimeout(() => {
          this.startBehavior(map, { behavior, direction, time, retry })
        }, 10);

        return
      }

      map.moveWall(this.x, this.y, this.direction)
      this.movingProgressRemaining = 16

      this.updateSprite()
    }

    if (behavior === 'stand') {
      this.isStading = true
      setTimeout(() => {
        emitEvent('PersonStandComplete', { whoId: this.id })     
        this.isStading = false
      }, time);
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation('walk-' + this.direction)
      return
    }

    this.sprite.setAnimation('idle-' + this.direction)
  }
}


