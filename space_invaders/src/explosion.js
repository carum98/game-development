import { EXPLOSION_TYPE, PADDING_TOP } from './constants.js'
import { GameElement } from './game-element.js'
import { PIXEL_ART } from './pixel-art.js'

export class Explosion extends GameElement {
	constructor({ x, y, type }) {
		const sprite = PIXEL_ART[type]
		const color = type === EXPLOSION_TYPE.WALL ? 'red' : 'white'

		super({ x, y: y - PADDING_TOP, sprite, size: 3, color })

		this.delete = false
		this.delay = 0

		this.type = type
	}

	update() {
		this.delay++

		if (this.delay > 10) {
			this.delete = true
		}
	}
}