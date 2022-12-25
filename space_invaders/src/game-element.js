import { PADDING_TOP } from './constants.js'
import { drawPixelArt } from './util.js'

export class GameElement {
	constructor({ x, y, width, height, sprite, size, color }) {
		this.x = x
		this.y = y + PADDING_TOP

		if (width && height) {
			this.width = width
			this.height = height
		} else {
			const multipleFrames = sprite?.at(0)?.at(0).length > 1
			const spriteFrame = multipleFrames ? sprite[0] : sprite

			this.width = spriteFrame[0].length * size
			this.height = spriteFrame.length * size
		}

		this.sprite = sprite
		this.size = size
		this.color = color
	}

	draw(ctx, frame) {
		const { x, y, sprite, size, color } = this

		const pixels = frame !== undefined ? sprite?.at(frame) : sprite

		drawPixelArt({ ctx, x, y, color, pixels, size })
	}

	collidesWith(obj) {
		return (this.x < obj.x + obj.width
			&& this.x + this.width > obj.x
			&& this.y < obj.y + obj.height
			&& this.y + this.height > obj.y);
	}

	hitBox(ctx) {
		ctx.fillStyle = 'blue'
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}