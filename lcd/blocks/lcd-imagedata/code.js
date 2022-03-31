if (!state.imageData) {
  md`
No imageData connected.
  `
  return
}

runOnce(() => {
  html`<canvas id="c" />`
})

function addNoise(value) {
  const noise = Math.floor(Math.random() * (2 * state.noise) + -state.noise)
  return Math.min(255, Math.max(0, value + noise))
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//input: h in [0-360] and s,l in [0-1]  - ex: hsl2rgb(30, 1, .5)
// output: r,g,b in [0-255, 0-255, 0-255]
function hsl2rgb(h, s, l) {
  let a = s * Math.min(l, 1 - l)
  let f = (n, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  return [f(0) * 255, f(8) * 255, f(4) * 255]
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

let color1 //used for filter hue

for (let y = 0; y < canvas.height; y += subHeight) {
  const inputY = Math.floor(y / subHeight)
  const inputYOffset = inputY * state.imageData.width

  for (let x = 0; x < canvas.width; x += pixelWidth) {
    const inputOffset = (inputYOffset + x / pixelWidth) * 4
    let ipR = state.imageData.data[inputOffset]
    let ipG = state.imageData.data[inputOffset + 1]
    let ipB = state.imageData.data[inputOffset + 2]

    //invert
    if (state.invertColors) {
      ipR = 255 - ipR
      ipG = 255 - ipG
      ipB = 255 - ipB
    }

    //color variation
    ipR -= getRandom(-state.colorVariance, state.colorVariance)
    ipG -= getRandom(-state.colorVariance, state.colorVariance)
    ipB -= getRandom(-state.colorVariance, state.colorVariance)

    //update color
    color1 = hsl2rgb(parseInt(state.filterHue), 1, 0.5)

    //apply color filter
    if (state.filterStrength > 0) {
      ipR += parseInt((color1[0] - ipR) / (1 / state.filterStrength))
      ipG += parseInt((color1[1] - ipG) / (1 / state.filterStrength))
      ipB += parseInt((color1[2] - ipB) / (1 / state.filterStrength))
    }

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
