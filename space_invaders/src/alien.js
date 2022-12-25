import { GameElement } from './game-element.js'
import { Bullet } from './bullet.js'
import { ALIEN_PADDING, ALIEN_ROWS, ALIEN_COLUMNS, ALIEN_SHOOT_INTERVAL, DIRECTION } from './constants.js'
import { random } from './util.js'
import { PIXEL_ART } from './pixel-art.js'

export class Aliens {
	constructor({ canvas }) {
		this.canvas = canvas

		this.aliens = []

		this.timer = 0
		this.interval = 500

		this.direction = DIRECTION.RIGHT

		this.bullets = []

		this.speed = 15
	}

	initAliens() {
		for (let i = 0; i < ALIEN_ROWS; i++) {
			for (let j = 0; j < ALIEN_COLUMNS; j++) {
				const sprite = i < 1 ? PIXEL_ART.SQUID : i < 3 ? PIXEL_ART.CRAB : PIXEL_ART.OCTOPUS
				const points = i < 1 ? 30 : i < 3 ? 20 : 10

				const alien = new Alien({
					x: j * (35 + ALIEN_PADDING) + ALIEN_PADDING,
					y: i * (30 + ALIEN_PADDING) + ALIEN_PADDING,
					sprite,
					points,
				})

				this.aliens.push(alien)
			}
		}

		this.speed = 15

		// Interval to shoot
		setInterval(() => {
			this.shoot()
		}, ALIEN_SHOOT_INTERVAL)
	}

	update(deltaTime) {
		this.timer += deltaTime

		if (this.timer > this.interval) {
			this.timer = 0

			if (this.aliens.some(alien => alien.x + alien.width > this.canvas.width - ALIEN_PADDING)) {
				this.direction = DIRECTION.LEFT

				this.speed += 2
			} else if (this.aliens.some(alien => alien.x < 0 + ALIEN_PADDING)) {
				this.direction = DIRECTION.RIGHT

				this.speed += 2
			}

			this.aliens.forEach(alien => {
				if (alien.direction !== null && alien.direction !== this.direction) {
					alien.y += 20
				}
				alien.direction = this.direction
			})

			this.aliens.forEach(alien => alien.update(this.speed))
		}

		this.bullets = this.bullets.filter(bullet => !bullet.delete)
		this.bullets.forEach(bullet => bullet.update())
	}

	removeAlien(alien) {
		const index = this.aliens.indexOf(alien)
		this.aliens.splice(index, 1)
	}

	draw(ctx) {
		this.aliens.forEach(alien => alien.draw(ctx))

		this.bullets.forEach(bullet => bullet.draw(ctx))
	}

	shoot() {
		const alien = random(this.aliens)

		if (!alien) return

		const bullet = new Bullet({
			x: alien.x + alien.width / 2,
			y: alien.y,
			direction: DIRECTION.DOWN,
		})

		this.bullets.push(bullet)
	}

	reset() {
		this.bullets = []
		this.aliens = []
		// this.initAliens()
	}
}

export class Alien extends GameElement {
	constructor({ x, y, sprite, points }) {
		super({ x, y, sprite, size: 3, color: 'white' })

		this.direction = null
		this.frame = 0

		this.points = points
	}

	update(speed) {
		if (this.direction === DIRECTION.LEFT) {
			this.x -= speed
		}
		if (this.direction === DIRECTION.RIGHT) {
			this.x += speed
		}

		this.frame = (this.frame + 1) % 2
	}

	draw(ctx) {
		super.draw(ctx, this.frame)
	}
}