export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down'
}

export const AXIS = {
  [DIRECTION.LEFT]: { x: -5, rotation: Math.PI },
  [DIRECTION.RIGHT]: { x: 5, rotation: 0 },
  [DIRECTION.UP]: { y: -5, rotation: -Math.PI / 2 },
  [DIRECTION.DOWN]: { y: 5, rotation: Math.PI / 2 }
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
      if (!Object.keys(CONTROLS).includes(code)) return

      const direction = CONTROLS[code]

      if (!this.keys.includes(direction)) {
        this.keys.push(direction)
      }
    })

    document.addEventListener('keyup', ({ code }) => {
      if (!Object.keys(CONTROLS).includes(code)) return

      const direction = CONTROLS[code]

      if (this.keys.includes(direction)) {
        this.keys.splice(this.keys.indexOf(direction), 1)
      }
    })
  }

  get key() {
    return this.keys.at(0)
  }
}
