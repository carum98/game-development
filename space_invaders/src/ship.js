import { GameElement } from './game-element.js'
import { Bullet } from './bullet.js'
import { DIRECTION } from './constants.js'
import { PADDING_TOP } from './constants.js'
import { PIXEL_ART } from './pixel-art.js'
import { drawPixelArt } from './util.js'
import { Sound } from './sound.js'

export class Ship extends GameElement {
	constructor({ canvas }) {
		super({ sprite: PIXEL_ART.SHIP, size: 4, color: 'green' })

		this.canvas = canvas

		const { x, y } = this.#center()

		this.x = x
		this.y = y

		this.direction = null

		this.bullets = []

		this.explote = false
		this.frame = 0
		this.timer = 0
	}

	update() {
		// Explosion
		if (this.explote) {
			this.frame = (this.frame + 1) % PIXEL_ART.SHIP_EXPOSION.length
			this.timer++

			if (this.timer > 100) {
				this.timer = 0
				this.explote = false
			}

			// Stop update
			return
		}

		// Movement
		if (this.direction === DIRECTION.LEFT) {
			this.x -= 5
		}
		if (this.direction === DIRECTION.RIGHT) {
			this.x += 5
		}

		// Boundaries
		if (this.x < 0) {
			this.x = 0
		}

		if (this.x + this.width > this.canvas.width) {
			this.x = this.canvas.width - this.width
		}

		// Bullets
		this.bullets.forEach(bullet => bullet.update())
		this.bullets = this.bullets.filter(bullet => !bullet.delete)
	}

	draw(ctx) {
		if (this.explote) {
			const { x, y, size, color } = this
			drawPixelArt({ ctx, x, y, pixels: PIXEL_ART.SHIP_EXPOSION[this.frame], size, color })
		} else {
			super.draw(ctx)
		}

		this.bullets.forEach(bullet => bullet.draw(ctx))
	}

	shoot() {
		if (this.bullets.length > 0) return

		const bullet = new Bullet({
			x: this.x + this.width / 2 - 5,
			y: this.y - 10,
			simple: true,
		})

		Sound.play('shoot')

		this.bullets.push(bullet)
	}

	#center() {
		return {
			x: this.canvas.width / 2 - 25,
			y: this.canvas.height - PADDING_TOP - 15,
		}
	}

	reset() {
		const { x, y } = this.#center()

		this.x = x
		this.y = y

		this.bullets = []
	}
}