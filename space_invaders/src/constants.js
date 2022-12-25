// Game
export const PADDING_TOP = 80

// LOCAL STORAGE
export const LOCAL_STORAGE_KEY = 'space-invaders-highscore'

// Alien
export const ALIEN_ROWS = 5
export const ALIEN_COLUMNS = 11
export const ALIEN_PADDING = 15
export const ALIEN_SHOOT_INTERVAL = 2000

// Bullet
export const BULLET_SPEED = 8

// Explosion
export const EXPLOSION_TYPE = {
	WALL: 'WALL_EXPLOSION',
	ALIEN: 'ALIEN_EXPLOSION'
}

// Controls
export const DIRECTION = {
	LEFT: 'left',
	RIGHT: 'right',
	UP: 'up',
	DOWN: 'down'
}

export const CONTROLS = {
	'ArrowUp': DIRECTION.UP,
	'ArrowDown': DIRECTION.DOWN,
	'ArrowLeft': DIRECTION.LEFT,
	'ArrowRight': DIRECTION.RIGHT,
	'KeyW': DIRECTION.UP,
	'KeyS': DIRECTION.DOWN,
	'KeyA': DIRECTION.LEFT,
	'KeyD': DIRECTION.RIGHT
}

// Wall parts
export const WALL_PART_SIZE = 4