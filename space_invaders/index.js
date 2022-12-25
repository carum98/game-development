import { Aliens } from './src/alien.js'
import { Game } from './src/game.js'
import { Limit } from './src/limit.js'
import { Ship } from './src/ship.js'
import { Ufo } from './src/ufo.js'
import { Walls } from './src/wall.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const ship = new Ship({ canvas })
const aliens = new Aliens({ canvas })
const walls = new Walls({ canvas })
const ufo = new Ufo({ canvas })

const limitTop = new Limit({ canvas, top: canvas.height, color: 'black' })
const limitBase = new Limit({ canvas, top: 270, color: 'black' })
const limitBottom = new Limit({ canvas, top: 110, color: 'green' })

const game = new Game({
	ctx,
	ship,
	ufo,
	aliens,
	walls,
	limitTop,
	limitBottom,
	limitBase,
})

// game.start()

new FontFace(
	'Invaders',
	'url(./assets/fonts/space_invaders.woff)'
).load().then((font) => {
	document.fonts.add(font)
	game.init()
})