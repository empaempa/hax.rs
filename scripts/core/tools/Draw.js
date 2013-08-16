define( [
	"tools/Tool"
], function( Tool ) {
		"use strict";

		function Draw(player) {
			Tool.call(this);
			this.canvas = player.canvas;
			this.ctx = player.ctx;
		}
		Draw.translated = false;
		Draw.prototype = Object.create(Tool.prototype);
		Draw.prototype.constructor = Draw;

		Draw.prototype.rectangle = function (x, y, w, h, color) {
			
			if (color) {
				this.ctx.save();
				this.ctx.fillStyle = color;
			}
			
			this.ctx.fillRect(x*2, y*2, w*2, h*2);

			if (color) {
				this.ctx.restore();
			}
		}
		Draw.prototype.clear = function() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		};

		

		return Draw;
	}
);