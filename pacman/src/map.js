import { Player } from './player.js'
import { Boundaries, Boundary } from './boundary.js'
import { Points, Point } from './point.js'
import { Powers, Power } from './power.js'
import { Ghosts, Ghost } from './ghost.js'

const MARGIN_TOP = 80

export function buildMap(data) {
  const elements = data.map((row, index) => row.map((value, j) => {
    const x = Boundary.width * j + Boundary.width / 2
    const y = Boundary.height * index + Boundary.height / 2 + MARGIN_TOP

    if (value === ' ') {
      return new Point({ x, y })
    } else if (value === '*') {
      return new Power({ x, y })
    } else if (value === 'X') {
      return new Player({ x, y })
    } else if (['R', 'B', 'O', 'P'].includes(value)) {
      const color = {
        R: 'red',
        B: 'blue',
        O: 'orange',
        P: 'pink'
      }[value]

      return new Ghost({ x, y, color })
    } else if (value === '`') {
      return null
    } else {
      return new Boundary({
        x: Boundary.width * j,
        y: Boundary.height * index + MARGIN_TOP,
        type: value
      })
    }
  })
  ).flat()

  const points = new Points({
    points: elements.filter(item => item instanceof Point)
  })

  const boundaries = new Boundaries({
    boundaries: elements.filter(item => item instanceof Boundary)
  })

  const powers = new Powers({
    powers: elements.filter(item => item instanceof Power)
  })

  const ghosts = new Ghosts({
    ghosts: elements.filter(item => item instanceof Ghost)
  })

  const player = elements.find(item => item instanceof Player)

  return {
    player,
    points,
    boundaries,
    powers,
    ghosts
  }
}