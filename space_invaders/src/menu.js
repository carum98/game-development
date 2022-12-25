import { drawText, drawTypingText, drawPulsingText, drawPixelArt } from './util.js'
import { PIXEL_ART } from './pixel-art.js'

export const drawMenu = (ctx) => {
	const x = ctx.canvas.width / 2
	const y = 200

	const DELAY_TITLE = 500
	const DELAY_TABLE = 1000

	drawTypingText({
		ctx,
		text: `PLAY`,
		x,
		y,
	})

	setTimeout(() => {
		drawTypingText({
			ctx,
			text: `SPACE    INVADERS`,
			x,
			y: y + 50,
		})
	}, DELAY_TITLE)

	setTimeout(() => {
		drawText({
			ctx,
			text: `* SCORE ADVANCE TABLE *`,
			x,
			y: y + 160,
		})

		// UFO
		drawPixelArt({
			ctx, x: x - 120,
			y: y + 210,
			pixels: PIXEL_ART.UFO,
			color: 'white',
			size: 3
		})

		setTimeout(() => {
			drawTypingText({
				ctx,
				text: `= ? MYSTERY`,
				x: x + 10,
				y: y + 230,
			})
		}, 1000)


		// SQUID
		drawPixelArt({
			ctx, x: x - 110,
			y: y + 260,
			pixels: PIXEL_ART.SQUID[0],
			color: 'white',
			size: 3
		})

		setTimeout(() => {
			drawTypingText({
				ctx,
				text: `= 30  POINTS`,
				x: x + 5,
				y: y + 280,
			})
		}, 2000)


		// CRAB
		drawPixelArt({
			ctx, x: x - 115,
			y: y + 310,
			pixels: PIXEL_ART.CRAB[0],
			color: 'white',
			size: 3
		})

		setTimeout(() => {
			drawTypingText({
				ctx,
				text: `= 20  POINTS`,
				x: x + 5,
				y: y + 330,
			})
		}, 3000)


		// OCTOPUS
		drawPixelArt({
			ctx, x: x - 115,
			y: y + 360,
			pixels: PIXEL_ART.OCTOPUS[0],
			color: 'white',
			size: 3
		})

		setTimeout(() => {
			drawTypingText({
				ctx,
				text: `= 10  POINTS`,
				x: x + 5,
				y: y + 380,
			})
		}, 4000)
	}, DELAY_TABLE)

	drawPulsingText({
		ctx,
		text: `PRESS SPACE TO START`,
		x,
		y: y + 510,
	})
}