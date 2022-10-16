export class KeyListener {
  constructor(keyCode, callback) {
    this.keySafe = true

    this.keyDown = ({ code }) => {
      if (code === keyCode && this.keySafe) {
        this.keySafe = false
        callback()
      }
    }


    this.keyUp = ({ code }) => {
      if (code === keyCode) {
        this.keySafe = true
      }
    }

    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }


  unbind() {
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
  }
}
