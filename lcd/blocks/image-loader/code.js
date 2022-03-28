import fs from 'fs'

if (state.filename) {
  const image = fs.readFileSync(state.filename).toString('base64')
  html`<img id="image" src="data:image/png;base64,${image}"/>`

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = element.querySelector('#image')
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    state.imageData = ctx.getImageData(0, 0, img.width, img.height)
  }
}
