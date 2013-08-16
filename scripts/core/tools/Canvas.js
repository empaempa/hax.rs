define( [
	"tools/Tool"
], function( Tool ) {
	"use strict";

	function Canvas(player) {
		Tool.call(this);
		this.canvas = player.canvas;
		this.ctx = player.ctx;
	}
	Canvas.translated = false;
	Canvas.prototype = Object.create(Tool.prototype);
	Canvas.prototype.constructor = Canvas;

	Canvas.prototype.clear = function(color) {
		if (color) {
			this.ctx.save();
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.restore();
		} else {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	};

	return Canvas;

});