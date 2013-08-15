define( [
		"tools/Tool" ],
	function( Tool ) {

		"use strict";

		function Draw(params) {
			Tool.call(this);
			this.canvas = params.canvas;
			this.ctx = params.ctx;
		}
		Draw.translated = false;
		Draw.prototype = Object.create(Tool.prototype);
		Draw.prototype.constructor = Draw;

		Draw.prototype.rectangle = function (x, y, w, h) {
			this.ctx.save();
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(x, y, w, h);
			this.ctx.restore();
		}
		Draw.prototype.clear = function() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		};

		

		return Draw;
	}
);