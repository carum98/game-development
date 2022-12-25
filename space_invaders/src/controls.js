import { CONTROLS } from './constants.js'

export class Controls {
	constructor({ ship }) {
		this.ship = ship
	}

	startListening() {
		document.addEventListener('keydown', this.#keyDown.bind(this))
		document.addEventListener('keyup', this.#keyUp.bind(this))
	}

	stopListening() {
		document.removeEventListener('keydown', this.#keyDown.bind(this))
		document.removeEventListener('keyup', this.#keyUp.bind(this))
	}

	#keyDown(e) {
		if (CONTROLS[e.key]) {
			this.ship.direction = CONTROLS[e.key]
		} else if (e.key === ' ') {
			this.ship.shoot()
		}
	}

	#keyUp(e) {
		if (CONTROLS[e.key] === this.ship.direction) {
			this.ship.direction = null
		}
	}
}