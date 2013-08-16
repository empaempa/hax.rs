define([
	"tools/tools!",
	"core/Compiler",
	"util/helpers"
], function (tools, Compiler, helpers) {


	function Player (params) {
		this.app = params.app || null;
		this.canvas = params.canvas || document.createElement('canvas');
		this.elements = params.elements || $("<div/>");

		this.ctx = this.canvas.getContext("2d");
		this.toolchain = [];
		this.program = null;
		this.startTime = 0;
		this.pauseTime = 0;
	}

	Player.prototype.run = function() {
		if (this.program) return;
		
		var player = this;

		var st = helpers.now();
		var runable = Compiler.build( this.app );
		var et = helpers.now();
		

		if (runable) { // No syntax errors etc..

			console.log("Compiled in", et-st, "ms");

			this.toolchain.length = 0;
			for (var i = 0; i < tools.length; i++) {
				this.toolchain.push(new tools[i](this));
			}

			runable.prototype.update = function (deltaTime) {
				if (this.paused) return;
				var time = helpers.now();
				this.raf = requestAnimationFrame(this.update.bind( this ), player.canvas);
				this.main.update(time-player.startTime);
			};

			runable.prototype.stop = function () {
				this.paused = true;
				cancelAnimationFrame(this.raf);
			};

			this.startTime = helpers.now();

			this.program = helpers.construct(runable, this.toolchain);
		}
	};

	Player.prototype.stop = function() {
		if (!this.program) return;

		this.program.stop();
		for (var i = 0; i < this.toolchain.length; i++) {
			this.toolchain[i].destroy();
		}
		this.program = null;
	};

	Player.prototype.toggleRun = function() {
		if (this.program) {
			this.stop();
		} else {
			this.run();
		}
	};

	Player.prototype.togglePause = function() {
		if (!this.program) return;

		this.program.paused = !this.program.paused;
		if (!this.program.paused) {
			this.startTime += helpers.now() - this.pauseTime;
			for (var i = 0; i < this.toolchain.length; i++) {
				this.toolchain[i].play();
			}
			this.program.update();
		} else {
			this.pauseTime = helpers.now();
			for (var i = 0; i < this.toolchain.length; i++) {
				this.toolchain[i].pause();
			}
		}

		
		
	};

	Player.prototype.loadApp = function(app) {
		this.app = app;
	};

	return Player;
});