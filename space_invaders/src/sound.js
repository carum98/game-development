export class Sound {
	static #sound = {
		'shoot': new Audio('./assets/sounds/shoot.wav'),
		'ufo': new Audio('./assets/sounds/ufo.wav'),
		'hit-ship': new Audio('./assets/sounds/hit-ship.wav'),
		'hit-alien': new Audio('./assets/sounds/hit-alien.wav'),
		'background-1': new Audio('./assets/sounds/fastinvader1.wav'),
		'background-2': new Audio('./assets/sounds/fastinvader2.wav'),
		'background-3': new Audio('./assets/sounds/fastinvader3.wav'),
		'background-4': new Audio('./assets/sounds/fastinvader4.wav'),
	}

	static play(name) {
		const sound = Sound.#sound[name]

		if (sound) {
			sound.volume = 0.1
			sound.play()
		}
	}

	static stop(name) {
		const sound = Sound.#sound[name]

		if (sound) {
			sound.pause()
		}
	}

	static playLoop(name) {
		const sound = Sound.#sound[name]

		if (sound) {
			sound.volume = 0.1
			sound.loop = true
			sound.play()
		}
	}

	static startBackground(speed) {
		let tick = 1
		let time = 1000
		let lastSpeed = speed()

		function play() {
			Sound.play(`background-${tick}`)

			tick++

			if (tick === 5) {
				tick = 1
			}

			if (lastSpeed !== speed()) {
				lastSpeed = speed()
				time = time - lastSpeed
			}

			setTimeout(play, time)
		}

		play()
	}
}