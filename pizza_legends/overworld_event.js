import { MAPS } from './game_map.js'
import { TextMessage } from './text_message.js'
import { SceneTransition } from './scene_transition.js'
import { oppositiveDirection } from './util.js'

export class OverworldEvent {
  constructor({ map, event }) {
    this.map = map
    this.event = event
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who]
    const { type: behavior, direction, time } = this.event

    who.startBehavior(this.map, {
      direction,
      behavior,
      time
    })

    const completeHandler = (event) => {
      if (event.detail.whoId === this.event.who) {
        document.removeEventListener('PersonStandComplete', completeHandler)
        resolve()
      }
    }

    document.addEventListener('PersonStandComplete', completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who]
    const { type: behavior, direction } = this.event

    who.startBehavior(this.map, {
      direction,
      behavior,
      retry: true
    })

    const completeHandler = (event) => {
      if (event.detail.whoId === this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeHandler)
        resolve()
      }
    }

    document.addEventListener('PersonWalkingComplete', completeHandler)
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero]
      obj.direction = oppositiveDirection(this.map.gameObjects['hero'].direction)
    }
  

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })

    message.createElement(document.querySelector('.game-container'))
  }

  changeMap(resolve) {
    const animation = new SceneTransition()
    animation.init(document.querySelector('.game-container'), () => {
      const map = MAPS[this.event.map]
      this.map.overworld.startMap(map)

      resolve()

      animation.fadeOut()
    })
  }

  async start() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
}
