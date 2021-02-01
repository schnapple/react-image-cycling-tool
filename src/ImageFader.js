import React, {useEffect, useRef} from 'react'

function ImageFader(props) {
  var { background = 'white', 
        images = ["https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"], 
        width = window.width, 
        height = window.height, 
        objectFit = "stretch" } = props
  var canvas = useRef(null)
  var context;
  const imageDrawer = new ImageDraw()
  var img = new Image();
  var imageIndex = 1
  var transition = true
  var transitionCount = 0

  const init = () => {
    context = canvas.current.getContext('2d');
    context.fillStyle = "rgba(255,255,255,.5)";
    context.globalAlpha = .05
    context.lineWidth = 1;
    img.src = images[imageIndex]
    setInterval(function(){ 
      transition = true
    }, 10000);
    window.requestAnimationFrame(anim)
  }

  const anim = () => {
    imageDrawer.drawImage()
    window.requestAnimationFrame(anim)
  }

  useEffect(() => {
    init()
  }) 

  function ImageDraw(initalX, initalY, wait){
      this.x = initalX
      this.y = initalY
      this.drawImage = () => {
        if(transition){
          imageManipulation()
          transitionCount += 1
          context.globalAlpha += .04
        }
        if(transitionCount === 25){
          context.globalAlpha = 1
          context.clearRect(0,0,width,height)
          imageManipulation()
          context.globalAlpha = .05
          transitionCount = 0
          imageIndex += 1
          img.src = images[imageIndex%images.length]
          transition = false
        }
      }
  }

  const imageManipulation = () =>{
    switch(objectFit) {
      case "fit":
        expandAndCropImage()
        break;
      case "natural":
        naturalImage()
        break;
      default:
        stretchImage()
    }
  }

  const naturalImage = () => {
    context.drawImage(img, width/2 - img.naturalWidth/2, height/2 - img.naturalHeight/2, img.naturalWidth, img.naturalHeight);
  }

  const stretchImage = () => {
    context.drawImage(img, 0, 0, width, height);
  }

  const expandAndCropImage = () => {
    var resizeRatio = (height/width)
    var imageRatio = (img.naturalHeight/img.naturalWidth)
    var resizeFactor = resizeRatio/imageRatio
    var reposition;
    if(resizeFactor > 1){
      if(width > height){
        reposition = img.naturalWidth / resizeFactor
        context.drawImage(img, (img.naturalWidth - reposition) / 2, 0, reposition, img.naturalHeight, 0, 0, width, height);
      } else {
        reposition = img.naturalHeight / resizeFactor
        context.drawImage(img,  0, (img.naturalHeight - reposition) / 2, img.naturalWidth, reposition, 0, 0, width, height);
      }
    } else {
      if(width > height){
        reposition = img.naturalWidth * resizeFactor
        context.drawImage(img, (img.naturalWidth - reposition) / 2, 0, reposition, img.naturalHeight, 0, 0, width, height);
      } else {
        reposition = img.naturalHeight * resizeFactor
        context.drawImage(img, 0, (img.naturalHeight - reposition) / 2, img.naturalWidth, reposition, 0, 0, width, height);
      }
    } 
  }

  return (
    <canvas style={{background: background}} ref={canvas} width={width} height={height}>
    </canvas>
  );
}

export default ImageFader;
