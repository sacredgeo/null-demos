if (!state.imageDataIn) {
  md`No imageData connected.`
  return
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function rgbSplit(imageData, options) {
  // destructure the offset values from options, default to 0
  const { rOffset = 0, gOffset = 0, bOffset = 0 } = options
  // clone the pixel array from original imageData
  const originalArray = imageData.data
  const newArray = new Uint8ClampedArray(originalArray)
  // loop through every pixel and assign values to the offseted position
  for (let i = 0; i < originalArray.length; i += 4) {
    newArray[i + 0 + rOffset * 4] = originalArray[i + 0] // R
    newArray[i + 1 + gOffset * 4] = originalArray[i + 1] // G
    newArray[i + 2 + bOffset * 4] = originalArray[i + 2] // B
  }
  // return a new ImageData object
  return new ImageData(newArray, imageData.width, imageData.height)
}

const updatedImageData = rgbSplit(state.imageDataIn, {
  rOffset: parseInt(state.red),
  gOffset: parseInt(state.green),
  bOffset: parseInt(state.blue),
})

state.imageDataOut = updatedImageData

/*
Credit: https://hangindev.com/blog/rgb-splitting-effect-with-html5-canvas-and-javascript
*/
