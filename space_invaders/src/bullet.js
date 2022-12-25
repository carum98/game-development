import { BULLET_SPEED, PADDING_TOP } from './constants.js'
import { DIRECTION } from './constants.js'
import { GameElement } from './game-element.js'
import { random } from './util.js'
import { PIXEL_ART } from './pixel-art.js'

export class Bullet extends GameElement {
	constructor({ x, y, direction = DIRECTION.UP, simple = false }) {
		const { BULLET_1, BULLET_2, BULLET_3, BULLET_4 } = PIXEL_ART
		const bullets = [BULLET_1, BULLET_2, BULLET_3, BULLET_4]

		const sprite = simple ? BULLET_4 : random(bullets)

		super({ x, y: y - PADDING_TOP, sprite, size: 3, color: 'white' })

		this.delete = false

		this.direction = direction

		this.delay = 0
		this.frame = 0
		this.maxFrame = this.sprite.length
	}

	update() {
		if (this.direction === DIRECTION.DOWN) {
			this.y += BULLET_SPEED
		}

		if (this.direction === DIRECTION.UP) {
			this.y -= BULLET_SPEED
		}

		this.delay++

		if (this.delay > 2) {
			this.frame = (this.frame + 1) % this.maxFrame
			this.delay = 0
		}
	}

	draw(ctx) {
		super.draw(ctx, this.frame)
	}
}