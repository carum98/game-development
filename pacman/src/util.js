export function drawText({ text, x, y, color = 'white', ctx }) {
  ctx.font = "20px Emulogic"
  ctx.textAlign = "center"

  ctx.fillStyle = color

  ctx.fillText(text, x, y)
}