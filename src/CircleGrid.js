import React, {useLayoutEffect, useRef} from 'react'

function CircleGrid(props) {
  var{ fillColor, background, width, height, rows, columns } = props
  var canvas = useRef(null)
  var circles = [];
  var context;
  const m = {
    x: 0,
    y: 0
  };

  useLayoutEffect(() => {
    for(var i = 1; i < columns; i++){
      var posY = i * .05 * height;
      for(var j = 1; j < rows; j++){
        var posX = j * .04 * width
        var wait = (i + j) * 10
        circles.push(new CircleValue(posX, posY, wait))
      }
    }
    init()
    window.requestAnimationFrame(anim)
  })

  window.onmousemove = function(e) {
    m.x = e.clientX;
    m.y = e.clientY;
  }   

  const init = () => {
    context = canvas.current.getContext('2d');
    context.fillStyle = fillColor;
    context.globalAlpha = 1
    context.lineWidth = 1;
  }

  const anim = () => {
    
    context.clearRect(0, 0, width, height); // clear canvas
    context.fill();
    circles.forEach((circle) => {
        circle.drawRect(context)
    })
    window.requestAnimationFrame(anim)
  }

  function CircleValue(initalX, initalY, wait){
      this.x = initalX
      this.y = initalY
      this.radius = 10
      this.growth = .2
      this.wait = wait
      this.drawRect = (context) => {
        context.beginPath();
        var curX = this.x
        var curY = this.y
        context.arc(curX, curY, this.radius, 0, 2 * Math.PI, false);
        context.fill()
        context.closePath();
        if(this.wait === 0){
            this.radius += this.growth
            if(this.radius > 20){
                this.growth *= -1
            } else if(this.radius < 10){
                this.growth *= -1
                this.wait = (rows + columns) * 10
            }
        } else{
            this.wait -= 1
        }
        
      }
  }

  return (
    <canvas style={{background: background}} ref={canvas} width={width} height={height}>
    </canvas>
  );
}

export default CircleGrid;
