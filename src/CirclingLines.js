import React, {useLayoutEffect, useRef} from 'react'

function CirclingLines(props) {
  var{ strokeColor, fillColor, background, width, height } = props
  var canvas = useRef(null)
  var lines = [];
  var context;

  useLayoutEffect(() => {
    var posY = .8 * height + Math.random() * 10;
    for(var i = 0; i < 3; i++){
      var posX = Math.random() * width
      for(var j = 0; j < 10; j++){
        lines.push(new LineComponent(posX +  Math.random() * 100, posY, 1, 1))
      }
    }
    init()
    window.requestAnimationFrame(anim)
  })

  const init = () => {
    context = canvas.current.getContext('2d');
    context.strokeStyle = strokeColor
    context.fillStyle = fillColor;
    context.globalAlpha = 1
    context.lineWidth = 1;
  }

  const anim = () => {
    
    context.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
    context.fill();
    lines.forEach((line) => {
      line.drawRect(context)
    })
    window.requestAnimationFrame(anim)
  }

  function LineComponent(initalX, initalY){
      this.x = initalX
      this.y = initalY
      this.radius = 25
      this.color = 'blue'
      this.theta = Math.random() * Math.PI * 2;
      this.t = Math.random() * 7;
      this.drawRect = (context) => {
        this.theta += .01
        this.x = this.x + Math.cos(this.theta) * 2
        this.y = this.y + Math.sin(this.theta) * .5
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
        context.moveTo(this.x, this.y);
        context.lineTo(this.x*1.2, 0);
        context.fill()
        context.stroke();
        context.closePath();
      }
  }

  return (
    <canvas style={{background: background}} ref={canvas} width={width} height={height}>
    </canvas>
  );
}

export default CirclingLines;
