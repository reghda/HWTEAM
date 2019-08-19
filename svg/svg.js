class SVGPaint {
	
	constructor(svg, global = document){
		this.global = global;
		this.NS = 'http://www.w3.org/2000/svg';
		this.svg = svg;
		this.points = [];
		this.path = null;
		this.isMouseDown = false;
		svg.addEventListener('mousedown', this.mouseDown.bind(this));
		svg.addEventListener('mouseup', this.mouseUp.bind(this));
		svg.addEventListener('mousemove', e => this.mouseMove([e.pageX, e.pageY]));
	}

	addPoint(point){
		this.points = this.points.concat(point);
	}
	
	configureFlatPath(){
		this.path.setAttributeNS(null, 'd', `M ${this.points.toString()}`);
	}
	
	createLine(){
		let path = this.global.createElementNS(this.NS, 'path');
		path.setAttributeNS(null, 'stroke', 'green');
		path.setAttributeNS(null, 'fill', 'transparent');
		this.svg.appendChild(path);
        this.path = path;
        
        
	}
  
  mouseDown(){
  	this.isMouseDown = true;
    this.createLine();
    
  }
	
  mouseUp(){
  	this.isMouseDown = false;
    this.points = [];
  }
  
  mouseMove(point){	
  	if(this.isMouseDown) {
    	this.addPoint(point);
      this.configureFlatPath();
    }
  }  
}

function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}

let svg = document.querySelector('svg');
new SVGPaint(svg);