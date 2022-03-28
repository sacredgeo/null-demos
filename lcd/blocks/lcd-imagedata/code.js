if (!state.imageData) {
  md`No imageData connected.`
  return
}

runOnce(() => {
  html`<canvas id="c"/>`
})

function addNoise(value) {
  const noise = Math.floor(Math.random() * (2 * state.noise) + -state.noise)
  return Math.min(255, Math.max(0, value + noise))
}

const canvas = element.querySelector('#c')
const ctx = canvas.getContext('2d')

const subWidth = +state.subWidth
const subHeight = +state.subHeight

const width = state.imageData.width * subWidth * 3
const height = state.imageData.height * subHeight

canvas.width = width
canvas.height = height
const output = ctx.createImageData(width, height)
const { data } = output
//data.fill(0)

const pixelWidth = 3 * subWidth

for (let y = 0; y < canvas.height; y += subHeight) {
  const inputY = Math.floor(y / subHeight)
  const inputYOffset = inputY * state.imageData.width

  for (let x = 0; x < canvas.width; x += pixelWidth) {
    const inputOffset = (inputYOffset + x / pixelWidth) * 4
    const ipR = state.imageData.data[inputOffset]
    const ipG = state.imageData.data[inputOffset + 1]
    const ipB = state.imageData.data[inputOffset + 2]

    for (let sy = 0; sy < subHeight; sy++) {
      const outputYOffset = (y + sy) * width
      // rgb pixels
      for (let r = 0; r < subWidth; r++) {
        data[(outputYOffset + x + r) * 4] = addNoise(ipR)
        data[(outputYOffset + x + r) * 4 + 3] = 255
      }
      for (let r = 0; r < subWidth; r++) {
        data[(outputYOffset + x + r + subWidth) * 4 + 1] = addNoise(ipG)
        data[(outputYOffset + x + r + subWidth) * 4 + 3] = 255
      }
      for (let r = 0; r < subWidth; r++) {
        data[(outputYOffset + x + r + subWidth * 2) * 4 + 2] = addNoise(ipB)
        data[(outputYOffset + x + r + subWidth * 2) * 4 + 3] = 255
      }
    }
  }
}

ctx.putImageData(output, 0, 0)
canvas.style.width = `${state.zoom}%`
