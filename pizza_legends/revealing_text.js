export class RevelingText {
  constructor(config) {
    this.element = config.element
    this.text = config.text
    this.speed = config.speed || 60

    this.timeout = null
    this.isDone = false
  }

  init() {
    let characters = []

    this.text.split('').forEach(element => {
      const span = document.createElement('span')
      span.textContent = element
      this.element.appendChild(span)

      characters.push({
        span,
        delayAfter: element === ' ' ? 0 : this.speed
      })
    })

    this.reveal(characters)
  }

  reveal(list) {
    const next = list.splice(0,1)[0]
    next.span.classList.add('reveal')

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.reveal(list)
      }, next.delayAfter);
    } else {
      this.isDone = true
    }
  }

  warpToDone() {
    clearTimeout(this.timeout)
    this.isDone = true
    
    this.element.querySelectorAll('span').forEach(span => {
      span.classList.add('reveal')
    })
  }
}
