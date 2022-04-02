# null-demos
LCD code by Matt Way.

## Features:

### lcd-imagedata:
- subWidth/height (sub-pixel size: recommend 1/3 or 2/6)
- Effects are applied in this order:
  - invert colors
  - shift (rotate) hue
  - color fill
  - color variation 

### gif-file-loader:
- manually change fps

### rgb-split
- split RGB channels in different directions
- place between gif-file-loader and lcd-imagedata if desired
- can bypass if not desired

## Notes:

Recommend using small gif dimensions to increase performance and also to achieve the "old screen" look. For reference, the gif in the screenshot below has a width of 100px. You can resize a gif at https://ezgif.com/resize

## Images:

### Main blocks
<img width="900" src="https://user-images.githubusercontent.com/22250686/161350768-ef928d9b-2796-4581-98b6-8ab532ed329c.png">

### With rgb-split
<img width="900" src="https://user-images.githubusercontent.com/22250686/161372532-89fb6c4c-1274-489f-9e8d-b8bedb1fed3b.png">
