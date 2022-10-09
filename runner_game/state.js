import { Dust, Fire } from './particles.js'

export const states = {
  SITTING: 'sitting',
  RUNNING: 'running',
  JUMPING: 'jumping',
  FALLING: 'falling',
  ROLLING: 'rolling',
  DIVING: 'diving',
  HIT: 'hit',
}

class State {
  constructor(state, game, particle) {
    this.state = state
    this.game = game 

    this.particle = particle
  }

  get player() {
    return this.game.player
  }

  handleInput() {
    this.game.particles.unshift(this.particle.clone(this.player))
  }
}

export class StatesPlayer {
  constructor(game) {
    this[states.SITTING] = new Sitting(game)
    this[states.RUNNING] = new Running(game)
    this[states.JUMPING] = new Jumping(game)
    this[states.FALLING] = new Falling(game)
    this[states.ROLLING] = new Rolling(game)
    this[states.DIVING] = new Diving(game)
    this[states.HIT] = new Hit(game)
  }
}

class Sitting extends State {
  constructor(game) {
    super(states.SITTING, game)
  }

  enter() {
    this.player.frameY = 5
    this.player.maxFrame = 5

    this.game.speed = 0
  }

  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.RUNNING)
    }
  }
}

class Running extends State {
  constructor(game) {
    super(states.RUNNING, game, new Dust())
  }

  enter() {
    this.player.frameY = 3
    this.player.maxFrame = 9

    this.game.speed = this.game.maxSpeed
  }

  handleInput(input) {
    super.handleInput()

    if (input.includes('ArrowDown')) {
      this.player.setState(states.SITTING)
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.JUMPING)
    } else if (input.includes('Enter')) {
      this.player.setState(states.ROLLING)
    }
  }
}

class Jumping extends State {
  constructor(game) {
    super(states.JUMPING, game)
  }

  enter() {
    this.player.frameY = 1
    this.player.maxFrame = 7

    if (this.player.onGround()) {
      this.player.vy -= 18
    }
  }

  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING)
    } else if (input.includes('Enter')) {
      this.player.setState(states.ROLLING)
    } else if (input.includes('ArrowDown')) {
      this.player.setState(states.DIVING)
    }
  }
}

class Falling extends State {
  constructor(game) {
    super(states.FALLING, game)
  }

  enter() {
    this.player.frameY = 2
    this.player.maxFrame = 7
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING)
    } else if (input.includes('ArrowDown')) {
      this.player.setState(states.DIVING)
    }
  }
}

class Rolling extends State {
  constructor(game) {
    const fireImage = new Image()
    fireImage.src = './assets/fire.png'

    super(states.ROLLING, game, new Fire(fireImage))
  }

  enter() {
    this.player.frameY = 6
    this.player.maxFrame = 6
  }

  handleInput(input) {
    super.handleInput()

    if (!input.includes('Enter') && this.player.onGround()) {
      this.player.setState(states.RUNNING)
    } else if (!input.includes('Enter') && !this.player.onGround()) {
      this.player.setState(states.FALLING)
    } else if (input.includes('Enter') && input.includes('ArrowUp') && this.player.onGround()) {
      this.player.vy -= 18
    } else if (input.includes('ArrowDown')) {
      this.player.setState(states.DIVING)
    }
  }
}

class Diving extends State {
  constructor(game) {
    const fireImage = new Image()
    fireImage.src = './assets/fire.png'

    super(states.DIVING, game, new Fire(fireImage))
  }

  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 6
    this.player.vy = 18
  }

  handleInput(input) {
    super.handleInput()

    if (this.player.onGround()) {
      this.player.setState(states.RUNNING)
    } else if (input.includes('Enter') && this.player.onGround()) {
      this.player.setState(states.ROLLING)
    }
  }
}

class Hit extends State {
  constructor(game) {
    super(states.HIT, game)
  }

  enter() {
    this.player.maxFrame = 10
    this.player.frameY = 4

    this.game.speed = 0
  }

  handleInput() {
    if (this.player.frameX >= 9 && this.player.onGround()) {
      this.player.setState(states.RUNNING)
    } else if (this.player.frameX >= 10 && !this.player.onGround()) {
      this.player.setState(states.ROLLING)
    }
  }
} 


