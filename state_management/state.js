import { keys } from './input.js'

export const status = {
  STANDING_LEFT: 'standing_left',
  STANDING_RIGHT: 'standing_right',

  SITTING_LEFT: 'sitting_left',
  SITTION_RIGHT: 'sittion_right',

  RUNNING_LEFT: 'running_left',
  RUNNING_RIGHT: 'running_right',

  JUMPING_LEFT: 'jumping_left',
  JUMPING_RIGHT: 'jumping_right',

  FALLING_LEFT: 'falling_left',
  FALLING_RIGHT: 'falling_right'
}

class State {
  constructor(state, player) {
    this.state = state
    this.player = player
  }
}

export class PlayerStatus {
  constructor(player) {
      this[status.STANDING_LEFT] = new StandingLeft(player)
      this[status.STANDING_RIGHT] = new StandingRight(player)
      this[status.SITTING_LEFT] = new SittingLeft(player)
      this[status.SITTION_RIGHT] = new SittingRight(player)
      this[status.RUNNING_LEFT] = new RunningLeft(player)
      this[status.RUNNING_RIGHT] = new RunningRight(player)
      this[status.JUMPING_LEFT] = new JumpingLeft(player)
      this[status.JUMPING_RIGHT] = new JumpingRight(player)
      this[status.FALLING_LEFT] = new FallingLeft(player)
      this[status.FALLING_RIGHT] = new FallingRight(player)
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super(status.STANDING_LEFT, player)
  }

  enter() {
    this.player.frameY = 1
    this.player.speed = 0
    this.player.maxFrame = 6
  }

  handlerInput(input) {
    if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.RUNNING_RIGHT)
    } else if (input === keys.DOWN_LEFT) {
      this.player.setState(status.RUNNING_LEFT)
    } else if (input === keys.DOWN_DOWN) {
      this.player.setState(status.SITTING_LEFT)
    } else if (input === keys.DOWN_UP) {
      this.player.setState(status.JUMPING_LEFT)
    }
  }
}

export class StandingRight extends State {
  constructor(player) {
    super(status.STANDING_RIGHT, player)
  }

  enter() {
    this.player.frameY = 0
    this.player.speed = 0
    this.player.maxFrame = 6
  }

  handlerInput(input) {
    if (input === keys.DOWN_LEFT) {
      this.player.setState(status.RUNNING_LEFT)
    } else if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.RUNNING_RIGHT)
    } else if (input === keys.DOWN_DOWN) {
      this.player.setState(status.SITTION_RIGHT)
    } else if (input === keys.DOWN_UP) {
      this.player.setState(status.JUMPING_RIGHT)
    }
  }
}

export class SittingLeft extends State {
  constructor(player) {
    super(status.SITTING_LEFT, player)
  }

  enter() {
    this.player.frameY = 9
    this.player.maxFrame = 5
  }

  handlerInput(input) {
    if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.SITTION_RIGHT)
    } else if (input === keys.DOWN_UP) {
      this.player.setState(status.STANDING_LEFT)
    }  
  }
}


export class SittingRight extends State {
  constructor(player) {
    super(status.SITTION_RIGHT, player)
  }

  enter() {
    this.player.frameY = 8
    this.player.maxFrame = 9
  }

  handlerInput(input) {
    if (input === keys.DOWN_LEFT) {
      this.player.setState(status.SITTING_LEFT)
    } else if (input === keys.DOWN_UP) {
      this.player.setState(status.STANDING_RIGHT)
    }  
  }
}


export class RunningLeft extends State {
  constructor(player) {
    super(status.RUNNING_LEFT, player)
  }

  enter() {
    this.player.frameY = 7
    this.player.speed = -this.player.maxSpeed
    this.player.maxFrame = 9
  }

  handlerInput(input) {
    if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.RUNNING_RIGHT)
    } else if (input === keys.UP_LEFT) {
      this.player.setState(status.STANDING_LEFT)
    } else if (input === keys.DOWN_DOWN) {
      this.player.setState(status.RUNNING_LEFT)
    }
  }
}


export class RunningRight extends State {
  constructor(player) {
    super(status.RUNNING_RIGHT, player)
  }

  enter() {
    this.player.frameY = 6
    this.player.speed = this.player.maxSpeed
    this.player.maxFrame = 7
  }

  handlerInput(input) {
    if (input === keys.DOWN_LEFT) {
      this.player.setState(status.RUNNING_LEFT)
    } else if (input === keys.UP_RIGHT) {
      this.player.setState(status.STANDING_RIGHT)
    } else if (input === keys.DOWN_DOWN) {
      this.player.setState(status.SITTION_RIGHT)
    }
  }
}


export class JumpingLeft extends State {
  constructor(player) {
    super(status.JUMPING_LEFT, player)
  }

  enter() {
    this.player.frameY = 3
    this.player.maxFrame = 7

    if (this.player.onGround()) {
      this.player.vy -= 40
    }

    this.player.speed = -this.player.maxSpeed * 0.5
  }

  handlerInput(input) {
    if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.JUMPING_RIGHT)
    } else if (this.player.onGround()) {
      this.player.setState(status.STANDING_LEFT)
    } else if (this.player.vy > 0) {
      this.player.setState(status.FALLING_LEFT)
    }
  }
}


export class JumpingRight extends State {
  constructor(player) {
    super(status.JUMPING_RIGHT, player)
  }

  enter() {
    this.player.frameY = 2
    this.player.maxFrame = 7

    if (this.player.onGround()) {
      this.player.vy -= 40
    }

    this.player.speed = this.player.maxSpeed * 0.5
  }

  handlerInput(input) {
    if (input === keys.DOWN_LEFT) {
      this.player.setState(status.JUMPING_LEFT)
    } else if (this.player.onGround()) {
      this.player.setState(status.STANDING_LEFT)
    } else if (this.player.vy > 0) {
      this.player.setState(status.FALLING_RIGHT)
    }
  }
}


export class FallingLeft extends State {
  constructor(player) {
    super(status.FALLING_LEFT, player)
  }

  enter() {
    this.player.frameY = 5
    this.player.maxFrame = 7
  }

  handlerInput(input) {
    if (input === keys.DOWN_RIGHT) {
      this.player.setState(status.FALLING_RIGHT)
    } else if (this.player.onGround()) {
      this.player.setState(status.STANDING_LEFT)
    }  
  }
}


export class FallingRight extends State {
  constructor(player) {
    super(status.FALLING_RIGHT, player)
  }

  enter() {
    this.player.frameY = 4
    this.player.maxFrame = 7
  }

  handlerInput(input) {
    if (input === keys.DOWN_LEFT) {
      this.player.setState(status.FALLING_LEFT)
    } else if (this.player.onGround()) {
      this.player.setState(status.STANDING_RIGHT)
    } 
  }
}


