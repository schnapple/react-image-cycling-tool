import React, {useEffect, useRef} from 'react'

function ImageFader(props) {
  var { background = 'white', 
        images = ["https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"], 
        widthRatio = 1, 
        heightRatio = 1, 
        objectFit = "stretch" } = props
  var canvas = useRef(null)
  var context;
  const imageDrawer = new ImageDraw()
  var img = new Image();
  var curImg = new Image(); //used only for resizing
  var imageIndex = 1
  var transition = true
  var transitionCount = 0

  const resizeCanvas = () => {
    context.canvas.height = canvas.current.parentNode.offsetHeight * heightRatio;
    context.canvas.width = canvas.current.parentNode.offsetWidth * widthRatio;
    context.clearRect(0,0,context.canvas.width,context.canvas.height)
    imageManipulation(curImg)
  }

  window.onresize = function() {
    resizeCanvas();
  }

  const init = () => {
    context = canvas.current.getContext('2d');
    context.canvas.height = canvas.current.parentNode.offsetHeight;
    context.canvas.width = canvas.current.parentNode.offsetWidth;
    context.fillStyle = background;
    context.globalAlpha = .05
    context.lineWidth = 1;
    img.src = images[imageIndex]
    setInterval(function(){ 
      transition = true
    }, 10000);
  }

  const anim = () => {
    imageDrawer.drawImage()
    window.requestAnimationFrame(anim)
  }

  useEffect(() => {
    init()
    window.requestAnimationFrame(anim)
  }) 

  function ImageDraw(initalX, initalY, wait){
      this.x = initalX
      this.y = initalY
      this.drawImage = () => {
        if(transition){
          imageManipulation(img)
          transitionCount += 1
          context.globalAlpha += .04
        }
        if(transitionCount === 25){
          context.globalAlpha = 1
          context.clearRect(0,0,context.canvas.width,context.canvas.height)
          imageManipulation(img)
          context.globalAlpha = .05
          transitionCount = 0
          curImg.src = images[imageIndex%images.length]
          imageIndex += 1
          img.src = images[imageIndex%images.length]
          transition = false
        }
      }
  }

  const imageManipulation = (imageVal) =>{
    switch(objectFit) {
      case "fit":
        expandAndCropImage(imageVal)
        break;
      case "natural":
        naturalImage(imageVal)
        break;
      default:
        stretchImage(imageVal)
    }
  }

  const naturalImage = (imageVal) => {
    context.drawImage(imageVal, context.canvas.width/2 - imageVal.naturalWidth/2, context.canvas.height/2 - imageVal.naturalHeight/2, imageVal.naturalWidth, imageVal.naturalHeight);
  }

  const stretchImage = (imageVal) => {
    context.drawImage(imageVal, 0, 0, context.canvas.width, context.canvas.height);
  }

  const expandAndCropImage = (imageVal) => {
    var heightRatio = (imageVal.naturalHeight/context.canvas.height)
    var widthRatio = (imageVal.naturalWidth/context.canvas.width)
    if(heightRatio > widthRatio){
      var newHeight = context.canvas.height * widthRatio
      context.drawImage(imageVal, 0, (imageVal.naturalHeight/2)-(newHeight/2), imageVal.width, newHeight, 0, 0, context.canvas.width, context.canvas.height);
    } else {
      var newWidth = context.canvas.width * heightRatio
      context.drawImage(imageVal, (imageVal.naturalWidth/2)-(newWidth/2), 0, newWidth, imageVal.height, 0, 0, context.canvas.width, context.canvas.height);
    } 
  }
  return (
    <canvas id="image-cycling-tool" style={{background: background}} ref={canvas} width={widthRatio} height={heightRatio}>
    </canvas>
  );
}

export default ImageFader;