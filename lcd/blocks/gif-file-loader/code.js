import fs from 'fs'
import { parseGIF, decompressFrames } from 'gifuct-js'

if (!state.filename) {
  md`Select a GIF`
  return
}

const file = fs.readFileSync(state.filename)
const gif = await parseGIF(file)
state.frames = await decompressFrames(gif, true)

runOnce(() => {
  html`<canvas id="c"/>`
})

const canvas = element.querySelector('#c')
const ctx = canvas.getContext('2d')
canvas.width = gif.lsd.width
canvas.height = gif.lsd.height

const frameCanvas = document.createElement('canvas')
const frameCtx = frameCanvas.getContext('2d')
const frameData = frameCtx.createImageData(gif.lsd.width, gif.lsd.height)

function drawFrame(frame) {
  if (frame.disposalType === 2) {
    frameCtx.clearRect(0, 0, c.width, c.height)
  }
  frameData.data.set(frame.patch)
  frameCtx.putImageData(frameData, 0, 0)

  ctx.drawImage(frameCanvas, 0, 0)
  state.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

if (state.animate) {
  for (let index = 0; ; index++) {
    drawFrame(state.frames[index % state.frames.length])
    if (state.fps) {
      await delay(parseInt(1000 / state.fps))
    }
    yield
  }
} else {
  drawFrame(state.frames[0])
}
