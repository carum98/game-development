export function withGrid(value) {
  return value * 16
}

export function gridCoord(x, y) {
  return `${x * 16},${y * 16}`
}

export function nextPosition(initialX, initialY, direction) {
  let x = initialX
  let y = initialY

  const size = 16

  if (direction === 'left') {
    x -= size
  } else if (direction === 'right') {
    x += size
  } else if (direction === 'up') {
    y -= size
  } else if (direction === 'down') {
    y += size
  }

  return { x, y }
}

export function oppositiveDirection(direction) {
  if (direction === 'left') {
    return 'right'
  }
  if (direction === 'right') {
    return 'left'
  }
  if (direction === 'up') {
    return 'down'
  }
  if (direction === 'down') {
    return 'up'
  }
}

export function emitEvent(name, detail) {
  const event = new CustomEvent(name, { detail })

  document.dispatchEvent(event)
}
