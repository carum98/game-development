export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
}

const CONTROLS = {
  'ArrowUp': DIRECTION.UP,
  'ArrowDown': DIRECTION.DOWN,
  'Space': DIRECTION.UP,
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
