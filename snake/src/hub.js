export class Hub {
  constructor({ element }) {
    this.scoreElement = element
  }

  updateScore(score) {
    this.scoreElement.textContent = score < 10 ? `0${score}` : score
  }

}
