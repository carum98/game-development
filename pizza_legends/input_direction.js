const MAP_KEYS = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'KeyW': 'up',
  'KeyS': 'down',
  'KeyA': 'left',
  'KeyD': 'right'
}

export class InputDirection {
  constructor() {
    this.keys = []
    
    const keys_available = Object.keys(MAP_KEYS)

    window.addEventListener('keydown', event => {
      const key = MAP_KEYS[event.code]

      if (keys_available.includes(event.code) && !this.keys.includes(key)) {
        this.keys.unshift(key)
      }
    })

    window.addEventListener('keyup', event => {
      const key = MAP_KEYS[event.code]

      if (keys_available.includes(event.code) && this.keys.includes(key)) {
        this.keys.splice(this.keys.indexOf(key), 1)
      }
    })
  }

  get direction() {
    return this.keys[0]
  }
}
