import { Sprite } from './sprite.js'
import { OverworldEvent } from "./overworld_event.js";

export class GameObject {
  constructor(config) {
    this.id = null

    this.x = config.x
    this.y = config.y

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,  
    })

    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorIndex = 0

    this.talking = config.talking || []
  }

  mount(map) {
    map.addWall(this.x, this.y)

    setTimeout(() => {
      this.behaviorEvent(map)
    }, 10);
  }

  update() {
  }

  async behaviorEvent(map) {
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return 
    }

    let event = this.behaviorLoop[this.behaviorIndex]
    event.who = this.id

    const eventHandler = new OverworldEvent({ map, event })
    await eventHandler.start()

    this.behaviorIndex += 1

    if (this.behaviorIndex === this.behaviorLoop.length) {
      this.behaviorIndex = 0
    }
      
     this.behaviorEvent(map)
  }
}
