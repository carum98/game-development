import { KeyListener } from './key_listener.js'
import { RevelingText } from './revealing_text.js'

export class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text
    this.onComplete = onComplete
    this.element = null

    this.revealingText = null
    this.actionListener = null
  }

  createElement(container) {
    this.element = document.createElement('div')
    this.element.classList.add('text-message')

    this.element.innerHTML = [`
      <p></p>
      <button>Next</button>
    `]

    this.revealingText = new RevelingText({
      element: this.element.querySelector('p'),
      text: this.text
    })

    this.revealingText.init()

    container.appendChild(this.element)

    this.element.querySelector('button').addEventListener('click', () => {
      this.done()
    })

    this.actionListener = new KeyListener('Enter', () => {
      this.done()
    })
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove()
      this.actionListener.unbind()
      this.onComplete()
    } else {
      this.revealingText.warpToDone()
    }
  }
}
