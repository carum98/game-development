export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down'
}

export const AXIS = {
  [DIRECTION.UP]: ['y', -1],
  [DIRECTION.DOWN]: ['y', 1],
  [DIRECTION.LEFT]: ['x', -1],
  [DIRECTION.RIGHT]: ['x', 1]
}

const CONTROLS = {
  'ArrowUp': DIRECTION.UP,
  'ArrowDown': DIRECTION.DOWN,
  'ArrowLeft': DIRECTION.LEFT,
  'ArrowRight': DIRECTION.RIGHT,
  'KeyW': DIRECTION.UP,
  'KeyS': DIRECTION.DOWN,
  'KeyA': DIRECTION.LEFT,
  'KeyD': DIRECTION.RIGHT
}

export class Controls {
  constructor() {
    this.keys = []

    document.addEventListener('keydown', ({ code }) => {
      const direction = CONTROLS[code]

      if (Object.keys(CONTROLS).includes(code) && !this.keys.includes(direction)) {
        this.keys.unshift(direction)
      }
    })

    document.addEventListener('keyup', ({ code }) => {
      const direction = CONTROLS[code]

      if (Object.keys(CONTROLS).includes(code) && this.keys.includes(direction)) {
        this.keys.splice(this.keys.indexOf(direction), 1)
      }
    })
  }

  get direction() {
    return this.keys[0]
  }
}
