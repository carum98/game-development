export class Hub {
  constructor() {
    this.score = document.querySelector('header h1 span')

    this.pause = document.querySelector('header button')
    this.menu = document.querySelector('form')

    this.menuModal = document.querySelector('#menu')
    this.pauseModal = document.querySelector('#pause')
    this.gameoverModal = document.querySelector('#gameover')

    this.showMenu()
  }

  updateScore(value) {
    this.score.textContent = value < 10 ? `0${value}` : value 
  }

  showMenu() {
    this.menuModal.showModal()

    inputRangeReactive(this.menu.querySelector('#cell_count'))
    inputRangeReactive(this.menu.querySelector('#speed'))
  }

  showPause() {
    this.pauseModal.showModal()

    const resume = this.pauseModal.querySelector('#resume')
    const reset = this.pauseModal.querySelector('#reset')

    return new Promise((resolve, reject) => {
      resume.addEventListener('click', () => {
        this.pauseModal.close()
        resolve()
      })
      reset.addEventListener('click', () => {
        this.pauseModal.close()
        this.showMenu()
        reject()
      })
    })
  }

  showGameover(score) {
    this.gameoverModal.showModal()

    this.gameoverModal.querySelector('h3 span').innerText = score

    this.gameoverModal.querySelector('button').addEventListener('click', (_) => {
      this.gameoverModal.close()
      this.showMenu()
    })
  }
}

function inputRangeReactive(element) {
  const input = element.querySelector('input')
  const value = element.querySelector('span')

  value.innerText = input.value

  input.addEventListener('input', (e) => {
    value.innerText = e.target.value
  })
}
