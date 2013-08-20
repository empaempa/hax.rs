define( [
	"tools/Tool"
], function( Tool ) {
		"use strict";

		function Draw(player) {
			Tool.call(this);
			this.canvas = player.canvas;
			this.ctx = player.ctx;
			this.pixelRatio = player.pixelRatio;
		}
		Draw.translated = false;
		Draw.prototype = Object.create(Tool.prototype);
		Draw.prototype.constructor = Draw;

		Draw.prototype.rectangle = function (x, y, w, h, color) {
			
			if (color) {
				this.ctx.save();
				this.ctx.fillStyle = color;
			}
			
			this.ctx.fillRect(x*this.pixelRatio, y*this.pixelRatio, w*this.pixelRatio, h*this.pixelRatio);

			if (color) {
				this.ctx.restore();
			}
		}

		

		return Draw;
	}
);