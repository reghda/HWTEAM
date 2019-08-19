(function () {
	let canvasBody = document.getElementById("canvas"),
		canvas = canvasBody.getContext("2d"),


		w = canvasBody.width = 1280, //ширина
		h = canvasBody.height = 720, //высота

		tick = 0,

		opts = {
			backgroundColor: "white",
			particleColor: "black",
			defaultSpeed: 1,
			addedSpeed: 5,
			defaultRadius: 5,
			addedRadius: 20,
		},

		particles = [],

		Particle = function (Xpos, Ypos) {
			this.x = Xpos ? Xpos : Math.random() * w; //рандомное местоположение
			this.y = Ypos ? Ypos : Math.random() * h; //
			this.speed = opts.defaultSpeed + Math.random() * opts.addedSpeed; //скорость шарика
			this.directionAngle = Math.floor(Math.random() * 360); //угол смены полёта
			this.color = opts.particleColor;
			this.radius = opts.defaultRadius + Math.random() * opts.addedRadius; //радиус
			this.d = { //направления в соответствии с углом
				x: Math.cos(this.directionAngle) * this.speed,
				y: Math.sin(this.directionAngle) * this.speed
			};

			this.update = function () { //обновляет колл шариков
				this.border();
				this.x += this.d.x;
				this.y += this.d.y;
			};

			this.border = function () { //отскок от бордера 
				if (this.x >= w || this.x <= 0) { //X стенка
					this.d.x *= -1;
				}
				if (this.y >= h || this.y <= 0) { //низ и верх
					this.d.y *= -1;
				}
				this.x > w ? this.x = w : this.x;
				this.y > h ? this.y = h : this.y;
				this.x < 0 ? this.x = 0 : this.x;
				this.y < 0 ? this.y = 0 : this.y;
			};

			this.draw = function () { //рисует шарик 
				canvas.beginPath();
				canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				canvas.closePath();
				canvas.fillStyle = this.color;
				canvas.fill();
			};
		};

	function setup() {
		window.requestAnimationFrame(loop);
	}

	function loop() { //анимация 
		window.requestAnimationFrame(loop);
		tick++;

		//рисует фон
		canvas.fillStyle = opts.backgroundColor;
		canvas.fillRect(0, 0, w, h);

		//выполняет функции шариков 
		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();
		}
	}

	//выполняет анимации
	setup();
	canvasBody.addEventListener("click", function (e) {
		particles.push(new Particle(e.pageX, e.pageY));
		console.log(particles.length);
	});
})();