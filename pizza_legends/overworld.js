import { InputDirection } from './input_direction.js'
import { GameMap, MAPS } from './game_map.js'
import { KeyListener } from './key_listener.js'

export class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector('#game-canvas')
    this.ctx = this.canvas.getContext('2d')

    this.input = new InputDirection()

    this.map = null
  }

  gameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const cameraPerson = this.map.gameObjects.hero

      Object.values(this.map.gameObjects).forEach(element => {
        element.update(this.input.direction, this.map)
      })

      this.map.drawLowerImage(this.ctx, cameraPerson)

      Object.values(this.map.gameObjects).sort((a, b) => a.y - b.y).forEach(element => {
        element.sprite.draw(this.ctx, cameraPerson)
      })

      this.map.drawUpperImage(this.ctx, cameraPerson)

      requestAnimationFrame(step)
    }

    step()
  }

  bindKeyListener() {
    new KeyListener('Enter', () => {
      this.map.checkForKeyCutscene()
    })
  }

  bindPositionListener() {
    document.addEventListener('PersonWalkingComplete', e => {
      if (e.detail.whoId === 'hero') {
        this.map.checkForPositionCutscene()
      }
    })
  }

  startMap(mapConfig) {
    this.map = new GameMap(mapConfig)
  }

  init() {
    this.startMap(MAPS.DEMO_ROOM)
    this.map.overworld = this

    this.bindKeyListener()
    this.bindPositionListener()

    this.gameLoop()

    this.map.startCutscene([
    //   { who: 'hero', type: 'walk', direction: 'down' },
    //   { who: 'hero', type: 'walk', direction: 'down' },
    //   { who: 'npcA', type: 'walk', direction: 'up' },
    //   { who: 'npcA', type: 'walk', direction: 'left' },
    //   { who: 'hero', type: 'stand', direction: 'right', time: 200 },

    // { type: 'textMessage', text: 'This is a large text, to test the typing animation' }
    // { type: 'changeMap', map: 'DEMO_ROOM'}
    ])
  }
}
