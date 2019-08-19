function init() {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    let paint = false;
    const stroke_weight = document.querySelector('.stroke-weight');

    canvas.addEventListener("mousedown", Down);
    canvas.addEventListener("mouseup", Up);
    canvas.addEventListener("mousemove", Move);

    function Down(e) {
      paint = true;
      
      ctx.beginPath();
     let brushColor = document.getElementById("myColor");
    ctx.strokeStyle = brushColor.value; 
    ctx.lineWidth = stroke_weight.value;
    
      ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    }

    function Up() {
      paint = false;
      ctx.closePath();
    }

    function Move(e) {
      if (paint == true) {
        ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        ctx.stroke();
      }
    }
 }
 function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}
function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}
  init();