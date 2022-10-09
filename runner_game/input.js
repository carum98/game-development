const availableKeys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
]

export class Input {
  constructor() {
    this.keys = []

    window.addEventListener('keydown', ({ key }) => {
      if (availableKeys.includes(key) && !this.keys.includes(key)) {
        this.keys.push(key)
      }
    })

    
    window.addEventListener('keyup', ({ key }) => {
      if (availableKeys.includes(key) && this.keys.includes(key)) {
        this.keys.splice(this.keys.indexOf(key), 1)
      }
    })
  }
}
