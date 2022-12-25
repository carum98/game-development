import { EXPLOSION_TYPE, LOCAL_STORAGE_KEY } from './constants.js'
import { Controls } from './controls.js'
import { Explosion } from './explosion.js'
import { drawMenu } from './menu.js'
import { PIXEL_ART } from './pixel-art.js'
import { Sound } from './sound.js'
import { drawPixelArt, drawText, random, stopTimeOutAndIntervals } from './util.js'

export class Game {
	#tick = 0
	#running = true
	#highscore = localStorage.getItem(LOCAL_STORAGE_KEY)

	constructor({ ctx, ship, ufo, aliens, walls, limitTop, limitBase, limitBottom }) {
		this.ctx = ctx
		this.ship = ship
		this.ufo = ufo
		this.aliens = aliens
		this.walls = walls
		this.limitTop = limitTop
		this.limitBase = limitBase
		this.limitBottom = limitBottom

		this.explosions = []

		this.score = 0
		this.lives = 2

		this.controls = new Controls({ ship })
	}

	// Game loop
	gameLoop(timeStamp) {
		if (!this.#running) return

		const { ctx, ship, ufo, aliens, walls, limitTop, limitBase, limitBottom } = this

		// Clear the canvas
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		// Calculate delta time
		const deltaTime = timeStamp - this.#tick
		this.#tick = timeStamp

		// Check for collisions
		this.#checkCollision()

		// Check if next level
		if (aliens.aliens.length === 0) {
			aliens.initAliens()
		}

		// Update
		ship.update()
		ufo.update()
		aliens.update(deltaTime)

		// Draw
		ship.draw(ctx)
		ufo.draw(ctx)
		aliens.draw(ctx)
		walls.draw(ctx)
		limitTop.draw(ctx)
		limitBase.draw(ctx)
		limitBottom.draw(ctx)

		// Explosions
		this.explosions = this.explosions.filter(explosion => !explosion.delete)

		this.explosions.forEach(explosion => {
			explosion.update()
			explosion.draw(ctx)
		})

		this.#drawHud()

		// Request another frame
		requestAnimationFrame(this.gameLoop.bind(this))
	}

	init() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

		this.#drawHud(false)
		drawMenu(this.ctx)

		const runGame = (e) => {
			if (e.code === 'Space') {
				stopTimeOutAndIntervals()

				this.start()
			}

			document.removeEventListener('keydown', runGame)
		}

		document.addEventListener('keydown', runGame)
	}

	start() {
		this.aliens.initAliens()
		this.walls.initWalls()

		this.#ufoInterval()
		this.controls.startListening()

		this.#running = true
		this.gameLoop(0)

		Sound.startBackground(() => this.aliens.speed)
	}

	stop() {
		this.#running = false
		this.controls.stopListening()

		stopTimeOutAndIntervals()

		setTimeout(() => {
			this.#reset()
			this.init()
		}, 2000)
	}

	#checkCollision() {
		const { ship, aliens, ufo, walls, limitTop, limitBase, limitBottom } = this

		ship.bullets.forEach(bullet => {
			// Check if bullet collides with alien
			aliens.aliens.forEach(alien => {
				const collide = alien.collidesWith(bullet)

				if (collide) {
					aliens.removeAlien(alien)
					bullet.delete = true

					this.explosions.push(new Explosion({
						x: alien.x,
						y: alien.y,
						type: EXPLOSION_TYPE.ALIEN
					}))

					this.score += alien.points

					Sound.play('hit-alien')
				}
			})

			// Check if bullet collides with wall
			walls.walls.forEach(wall => {
				const collide = wall.collidesWith(bullet)

				if (collide) {
					bullet.delete = true
				}
			})

			// Check if bullet collides with UFO
			const collideUfo = ufo.collidesWith(bullet)

			if (collideUfo) {
				bullet.delete = true
				ufo.stop()

				this.score += random([50, 100, 150, 200, 300])
			}

			// Check if bullet collides with limit top
			const collideLimit = limitTop.collidesWith(bullet)

			if (collideLimit) {
				bullet.delete = true
				this.explosions.push(new Explosion({
					x: bullet.x,
					y: bullet.y,
					type: EXPLOSION_TYPE.WALL
				}))
			}
		})

		aliens.bullets.forEach(bullet => {
			// Check if bullet collides with wall
			walls.walls.forEach(wall => {
				const collide = wall.collidesWith(bullet)

				if (collide) {
					bullet.delete = true
				}
			})

			// Check if bullet collides with ship
			const collide = ship.collidesWith(bullet)

			if (collide) {
				bullet.delete = true

				if (this.lives === 0) {
					this.#gameOver()
				} else {
					Sound.play('hit-ship')

					ship.explote = true
					this.lives--
				}
			}

			// Check if bullet collides with limit bottom
			const collide2 = limitBottom.collidesWith(bullet)

			if (collide2) {
				bullet.delete = true
				this.explosions.push(new Explosion({
					x: bullet.x,
					y: bullet.y,
					type: EXPLOSION_TYPE.WALL
				}))
			}
		})

		// Check if aliens reach the limit base
		aliens.aliens.forEach(alien => {
			const collide = limitBase.collidesWith(alien)

			if (collide) this.#gameOver()
		})
	}

	#reset() {
		this.ship.reset()
		this.aliens.reset()
		this.walls.reset()

		this.lives = 2
		this.score = 0
	}

	#drawHud(showLives = true) {
		const { ctx } = this

		const highscore = Math.max(this.score, this.#highscore)

		drawText({ ctx, text: `SCORE <1>`, x: 100, y: 25 })
		drawText({ ctx, text: this.score.toString().padStart(4, 0), x: 100, y: 65 })

		drawText({ ctx, text: `HI-SCORE`, x: ctx.canvas.width / 2, y: 25 })
		drawText({ ctx, text: highscore.toString().padStart(4, 0), x: ctx.canvas.width / 2, y: 65 })

		drawText({ ctx, text: 'SCORE <2>', x: ctx.canvas.width - 100, y: 25 })
		drawText({ ctx, text: '0000', x: ctx.canvas.width - 100, y: 65 })

		if (showLives) {
			drawText({ ctx, text: this.lives + 1, x: 10, y: ctx.canvas.height })

			for (let i = 0; i < this.lives; i++) {
				drawPixelArt({ ctx, x: 50 * i + 50, y: ctx.canvas.height - 20, pixels: PIXEL_ART.SHIP, color: 'green', size: 2 })
			}
		}

		drawText({ ctx, text: 'CREDIT 00', x: ctx.canvas.width - 80, y: ctx.canvas.height })
	}

	#ufoInterval() {
		setInterval(() => {
			this.ufo.start()
		}, 15000)
	}

	#gameOver() {
		const { ctx, score } = this

		// Stop game execution
		this.stop()

		// Handle the highscore
		const highscore = Math.max(score, this.#highscore)

		if (highscore > this.#highscore) {
			this.#highscore = highscore
			localStorage.setItem(LOCAL_STORAGE_KEY, highscore)
		}

		drawText({
			ctx,
			text: `GAME OVER`,
			x: ctx.canvas.width / 2,
			y: 150,
			color: 'red',
			font: '30px Invaders',
		})
	}
}
