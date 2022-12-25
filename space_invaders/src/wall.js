import { GameElement } from './game-element.js'
import { WALL_PART_SIZE } from './constants.js'
import { PIXEL_ART } from './pixel-art.js'

export class Walls {
	constructor({ canvas }) {
		this.canvas = canvas

		this.walls = []
	}

	initWalls() {
		const x = this.canvas.width / 2 - 200
		const y = this.canvas.height - 270

		for (let i = 0; i < 4; i++) {
			const wall = new Wall({
				x: x * i + 50,
				y,
			})

			this.walls.push(wall)
		}
	}

	update() {
		this.walls.forEach(wall => wall.update())
	}

	draw(ctx) {
		this.walls.forEach(wall => wall.draw(ctx))
	}

	reset() {
		this.walls = []

		this.initWalls()
	}
}

export class Wall {
	constructor({ x, y }) {
		this.parts = []

		PIXEL_ART.BUNKER.forEach((row, rowIndex) => {
			row.forEach((pixel, pixelIndex) => {
				if (pixel === '▓') {
					const part = new GameElement({
						x: x + pixelIndex * WALL_PART_SIZE,
						y: y + rowIndex * WALL_PART_SIZE,
						width: WALL_PART_SIZE,
						height: WALL_PART_SIZE,
					})

					this.parts.push(part)
				}
			})
		})
	}

	update() {
		this.parts.forEach(part => part.update())
	}

	draw(ctx) {
		this.parts.forEach(part => {
			ctx.fillStyle = 'green'
			ctx.fillRect(part.x, part.y, part.width, part.height)
		})
	}

	collidesWith(element) {
		return this.parts.some(part => {
			const collide = part.collidesWith(element)

			if (collide) {
				this.removePart(part)
			}

			return collide
		})
	}

	removePart(part) {
		this.parts = this.parts.filter(p => {
			const x = p.x - part.x
			const y = p.y - part.y

			return x > 3 || x < -3 || y > 15 || y < -15
		})
	}
}