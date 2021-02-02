import React, {useEffect, useRef} from 'react'

function ImageFader(props) {
  var { background = 'white', 
        images = ["https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"], 
        width = 1, 
        height = 1, 
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
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
    height =  window.innerHeight
    width =  window.innerWidth
    context.clearRect(0,0,width,height)
    imageManipulation(curImg)
  }

  window.onresize = function() {
    resizeCanvas();
    console.log(this)
  }

  const init = () => {
    context = canvas.current.getContext('2d');
    context.fillStyle = background;
    context.globalAlpha = .05
    context.lineWidth = 1;
    img.src = images[imageIndex]
    height =  window.innerHeight * height
    width =  window.innerWidth * width
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
          context.clearRect(0,0,width,height)
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
    context.drawImage(imageVal, width/2 - imageVal.naturalWidth/2, height/2 - imageVal.naturalHeight/2, imageVal.naturalWidth, imageVal.naturalHeight);
  }

  const stretchImage = (imageVal) => {
    context.drawImage(imageVal, 0, 0, width, height);
  }

  const expandAndCropImage = (imageVal) => {
    var heightRatio = (imageVal.naturalHeight/height)
    var widthRatio = (imageVal.naturalWidth/width)
    if(heightRatio > widthRatio){
      var newHeight = height * widthRatio
      context.drawImage(imageVal, 0, (imageVal.naturalHeight/2)-(newHeight/2), imageVal.width, newHeight, 0, 0, width, height);
    } else {
      var newWidth = width * heightRatio
      context.drawImage(imageVal, (imageVal.naturalWidth/2)-(newWidth/2), 0, newWidth, imageVal.height, 0, 0, width, height);
    } 
    
  }
  return (
    <canvas style={{background: background}} ref={canvas} width={window.innerWidth * width} height={window.innerHeight * height}>
    </canvas>
  );
}

export default ImageFader;