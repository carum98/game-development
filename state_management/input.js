export const keys = {
  // down
  DOWN_LEFT: 'down_left',
  DOWN_RIGHT: 'down_right',
  DOWN_UP: 'down_up',
  DOWN_DOWN: 'down_down',

  // up
  UP_LEFT: 'up_left',
  UP_RIGHT: 'up_right',
  UP_UP: 'up_up',
  UP_DOWN: 'up_down',
}

export class Input {
  constructor() {
    this.lastKey = ''

    window.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          this.lastKey = keys.DOWN_LEFT 
          break
        case 'ArrowRight':
          this.lastKey = keys.DOWN_RIGHT
          break
        case 'ArrowUp':
          this.lastKey = keys.DOWN_UP
          break
        case 'ArrowDown':
          this.lastKey = keys.DOWN_DOWN
      }
    })


    window.addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          this.lastKey = keys.UP_LEFT 
          break
        case 'ArrowRight':
          this.lastKey = keys.UP_RIGHT
          break
        case 'ArrowUp':
          this.lastKey = keys.UP_UP
          break
        case 'ArrowDown':
          this.lastKey = keys.UP_DOWN
      }
    })
  }
}


