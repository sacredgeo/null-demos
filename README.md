# GIF to LCD null-demo

This is a program for Null which decodes gif images and displays them with a glitchy TV / LCD screen effect. Check out Null here: https://github.com/matt-way/0x00

## Features:

### lcd-imagedata:
- subWidth/height (aka sub-pixel size. recommend 1/3 or 2/6)
- Effects are applied in this order:
  - invert colors
  - shift (rotate) hue
  - color fill
  - color variance (color varies per sub-pixel)

### gif-file-loader:
- manually change fps

### rgb-split
- split RGB channels in different directions
- place between gif-file-loader and lcd-imagedata if desired
- can bypass completely if not desired

## Notes:
- Recommend using small gif dimensions to increase performance and also to achieve the "old screen" look. For reference, the gif in the screenshot below has a width of 100px. You can resize a gif at https://ezgif.com/resize
- Credit to Matt Way for the majority of this code. I'm just adding features.

## Images:

### Main blocks
<img width="900" src="https://user-images.githubusercontent.com/22250686/161350768-ef928d9b-2796-4581-98b6-8ab532ed329c.png">

### With rgb-split
<img width="900" src="https://user-images.githubusercontent.com/22250686/161372532-89fb6c4c-1274-489f-9e8d-b8bedb1fed3b.png">
