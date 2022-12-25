import { GameElement } from './game-element.js'
import { PIXEL_ART } from './pixel-art.js'
import { Sound } from './sound.js'

export class Ufo extends GameElement {
	#show = false

	constructor({ canvas }) {
		const sprite = PIXEL_ART.UFO

		super({ x: 0, y: 0, sprite, size: 5, color: 'red' })

		this.canvas = canvas
	}

	start() {
		this.#show = true

		Sound.playLoop('ufo')
	}

	stop() {
		this.x = 0
		this.#show = false

		Sound.stop('ufo')
	}

	update() {
		if (!this.#show) return

		this.x += 3

		if (this.x > this.canvas.width) {
			this.x = 0

			this.stop()
		}
	}

	draw(ctx) {
		if (!this.#show) return

		super.draw(ctx)
	}
}