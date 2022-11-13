export class Sprite {
  constructor() {
    this.img = new Image()
    this.img.src = './assets/sprite.png'
  }

  dino() {
    return {
      img: this.img,
      height: 100,
      spriteWidth: 88,
      scale: 2,
      status: {
        idle: {
          x: 1678,
          y: 0,
          width: 88,
          frames: 1
        },
        running: {
          x: 1854,
          y: 0,
          width: 176,
          frames: 2
        },
        jumping: {
          x: 1678,
          y: 0,
          width: 88,
          frames: 1
        },
        down: {
          x: 2205,
          y: 0,
          width: 235,
          frames: 2
        },
        dead: {
          x: 2033,
          y: 0,
          width: 88,
          frames: 1
        }
      }
    }
  }

  floor() {
    return {
      img: this.img,
      x: 0,
      y: 102,
      width: this.img.width,
      height: 27,
      scale: 1.5
    }
  }

  cactus1() {
    return {
      img: this.img,
      x: 445,
      y: 0,
      width: 103,
      height: 70,
      scale: 2.5
    }
  }

  cactus2() {
    return {
      img: this.img,
      x: 650,
      y: 0,
      width: 53,
      height: 95,
      scale: 2.5
    }
  }

  hi() {
    return {
      img: this.img,
      x: 1495,
      y: 0,
      width: 37,
      height: 29,
      scale: 2
    }
  }

  numbers() {
    return {
      img: this.img,
      x: 1294,
      y: 0,
      width: 205,
      height: 29,
      spriteWidth: 20,
      scale: 2
    }
  }

  gameOver() {
    return {
      img: this.img,
      x: 1294,
      y: 30,
      width: 385,
      height: 25,
      scale: 2
    }
  }
}
