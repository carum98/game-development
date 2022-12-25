import { GameElement } from './game-element.js'

export class Limit extends GameElement {
	constructor({ top, canvas, color }) {
		super({
			x: 0,
			y: canvas.height - top,
			width: canvas.width,
			height: 2
		})

		this.color = color
	}

	draw(ctx) {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}