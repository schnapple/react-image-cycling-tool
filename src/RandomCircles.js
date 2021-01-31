import React, {useLayoutEffect, useRef} from 'react'

function RandomCircles(props) {
  var canvas = useRef(null)
  var lines = [];

  useLayoutEffect(() => {
    for(var i = 0; i < 10; i++){
      var posX = Math.random() * canvas.current.getContext('2d').canvas.width;
      var posY = Math.random() * canvas.current.getContext('2d').canvas.height;
      lines.push(new Circle(posX, posY, 1, 1))
    }
    canvas.current.getContext('2d').globalAlpha = 1
    anim();
  })

  const anim = () => {
    window.requestAnimationFrame(anim)
    canvas.current.getContext('2d').fillStyle = 'white'
    canvas.current.getContext('2d').fillRect(0,0, canvas.current.getContext('2d').canvas.width, canvas.current.getContext('2d').canvas.height)
    lines.forEach((line) => {
      line.drawCircle()
    })
  }

  function Circle(initalX, initalY, velocityX, velocityY){
      this.x = initalX
      this.y = initalY
      this.radius = 25
      this.color = 'blue'
      this.drawCircle = () => {
        canvas.current.getContext('2d').beginPath();
        canvas.current.getContext('2d').arc(this.x, this.y, 3, 0, Math.PI * 2, true);
        canvas.current.getContext('2d').closePath();
        canvas.current.getContext('2d').fillStyle = 'red';
        canvas.current.getContext('2d').fill();
      }
  }

  return (
    <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight}></canvas>
  );
}

export default RandomCircles;
