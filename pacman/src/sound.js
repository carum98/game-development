export class Sound {
  #sounds = {
    'chomp-1': new Audio('./assets/sounds/chomp-1.wav'),
    'chomp-2': new Audio('./assets/sounds/chomp-2.wav'),
    'eatghost': new Audio('./assets/sounds/eat-ghost.wav'),
    'death': new Audio('./assets/sounds/death.wav'),
    'power': new Audio('./assets/sounds/power.wav'),
    'menu': new Audio('./assets/sounds/menu.wav'),
  }

  constructor({ player, points }) {
    this.player = player
    this.points = points
  }

  update() {
    const { player, points } = this

    const isEating = points.isEmptyArea(player)

    if (isEating) {
      if (player.mouth.radians < 0) {
        this.play('chomp-1')
      }

      if (player.mouth.radians > .75) {
        this.play('chomp-2')
      }
    }
  }

  play(name) {
    const sound = this.#sounds[name]

    if (sound) {
      sound.volume = 0.1
      sound.play()
    }
  }

  stop(name) {
    const sound = this.#sounds[name]

    if (sound) {
      sound.pause()
      sound.currentTime = 0
    }
  }
}