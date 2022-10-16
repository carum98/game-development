import { Person } from "./person.js"
import { withGrid, gridCoord, nextPosition } from './util.js'
import { OverworldEvent } from "./overworld_event.js";

export const MAPS = {
  DEMO_ROOM: {
    lowerSrc: './assets/maps/DemoLower.png',
    upperSrc: './assets/maps/DemoUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerController: true,
        x: withGrid(5),
        y: withGrid(6),
        src: './assets/characters/people/hero.png',
      }),
      npcA: new Person({
        x: withGrid(7),
        y: withGrid(9),
        src: './assets/characters/people/npc1.png',
        // behaviorLoop: [
          // { type: 'stand', direction: 'left', time: 800 },
          // { type: 'stand', direction: 'up', time: 800 },
          // { type: 'stand', direction: 'right', time: 1200 },
          // { type: 'stand', direction: 'up', time: 300 },
        // ]
        talking: [
          {
            events: [
              { type: 'textMessage', text: 'I am bussy...', faceHero: 'npcA' },
              { type: 'textMessage', text: 'Hello Carlos' }
            ]
          }
        ]
      }),
      npcB: new Person({
        x: withGrid(3),
        y: withGrid(7),
        src: './assets/characters/people/npc2.png',
        behaviorLoop: [
          { type: 'walk', direction: 'left' },
          { type: 'stand', direction: 'up', time: 800 },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'down' },
        ],
      }),
      npcC: new Person({
        x: withGrid(8),
        y: withGrid(5),
        src: './assets/characters/people/npc3.png',
      }),
    },
    walls: {
      [gridCoord(7, 6)]: true,
      [gridCoord(8, 6)]: true,
      [gridCoord(7, 7)]: true,
      [gridCoord(8, 7)]: true,
    },
    cutScenes: {
      [gridCoord(7, 4)]: [
          {
            events: [
              { who: 'npcC', type: 'walk', direction: 'left' },
              { who: 'npcC', type: 'stand', direction: 'left', time: 500 },
              { type: 'textMessage', text: 'You cant be in there!' },
              { who: 'npcC', type: 'walk', direction: 'right' },
              { who: 'hero', type: 'walk', direction: 'down' },
              { who: 'hero', type: 'walk', direction: 'left' },
            ]
          }
        ],
      [gridCoord(5, 10)]: [
        {
          events: [
            { type: 'changeMap', map: 'KITCHEN'}
          ]
        }
      ]
    }
  },
  KITCHEN: {
    lowerSrc: './assets/maps/KitchenLower.png',
    upperSrc: './assets/maps/KitchenUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerController: true,
        x: withGrid(5),
        y: withGrid(6),
        src: './assets/characters/people/hero.png' 
      }),
      npc: new Person({
        x: withGrid(7),
        y: withGrid(9),
        src: './assets/characters/people/npc1.png'
      })
    }
  }
}

export class GameMap {
  constructor(config) {
    this.overworld = null

    this.gameObjects = config.gameObjects
    this.walls = config.walls || {}
    this.cutScenes = config.cutScenes || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    this.isCutscenePlaying = false

    Object.keys(this.gameObjects).forEach(key => {
      const element = this.gameObjects[key]
      element.id = key

      element.mount(this)
    })
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage, withGrid(10.5) - cameraPerson.x, withGrid(6) - cameraPerson.y)
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(this.upperImage, withGrid(10.5) - cameraPerson.x, withGrid(6) - cameraPerson.y)
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = nextPosition(currentX, currentY, direction)

    return this.walls[`${x},${y}`] || false
  }

  checkForKeyCutscene() {
    const hero = this.gameObjects['hero']
    const nextCoords = nextPosition(hero.x, hero.y, hero.direction)
    const match = Object.values(this.gameObjects).find(element => {
      return `${element.x},${element.y}` === `${nextCoords.x},${nextCoords.y}`
    })

    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForPositionCutscene() {
    const hero = this.gameObjects['hero']
    const match = this.cutScenes[`${hero.x},${hero.y}`]

    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events)
    }
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({ map: this, event: events[i] })
      await eventHandler.start()
    }

    this.isCutscenePlaying = false

    Object.values(this.gameObjects).forEach(element => {
      element.behaviorEvent(this)
    })
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const { x, y } = nextPosition(wasX, wasY, direction) 
    this.addWall(x, y)
  }
}



