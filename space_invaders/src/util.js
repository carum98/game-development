export function drawText({ ctx, text, x, y, color = 'white', font = '22px Invaders' }) {
	ctx.save()

	ctx.font = font
	ctx.fillStyle = color

	ctx.textAlign = 'center'

	ctx.fillText(text, x, y)

	ctx.restore()
}

export function drawPixelArt({ ctx, x, y, color, pixels, size = 5 }) {
	ctx.save()

	ctx.fillStyle = color

	pixels.forEach((row, rowIndex) => {
		row.forEach((pixel, pixelIndex) => {
			if (pixel === '▓') {
				ctx.fillRect(x + pixelIndex * size, y + rowIndex * size, size, size)
			}
		})
	})

	ctx.restore()
}

export function random(items) {
	return items[Math.floor(Math.random() * items.length)]
}

export function drawTypingText({ ctx, text, x, y, color, font }) {
	x = x - ctx.measureText(text).width

	for (let i = 0; i < text.length; i++) {
		const chart = text[i]

		setTimeout(() => {
			drawText({ ctx, text: chart, x, y, color, font })
			x += ctx.measureText(chart).width + (chart === ' ' ? 5 : 10)
		}, 100 * i)
	}
}

export function drawPulsingText({ ctx, text, x, y, color, font }) {
	let isShowing = true

	setInterval(() => {
		if (isShowing) {
			drawText({ ctx, text, x, y, color, font })
		} else {
			const width = text.length * 15
			ctx.clearRect(x - width / 2, y - 50, width, 100)
		}

		isShowing = !isShowing
	}, 500)
}

export function stopTimeOutAndIntervals() {
	let id = window.setTimeout(function () { }, 0)

	while (id--) {
		window.clearTimeout(id)
	}

	id = window.setInterval(function () { }, 0)

	while (id--) {
		window.clearInterval(id)
	}
}