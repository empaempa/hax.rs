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
	};

	Draw.prototype.text = function(text, x, y, color) {
		if (color) {
			this.ctx.save();
			this.ctx.fillStyle = color;
		}

		this.ctx.fillText(text, x*this.pixelRatio, y*this.pixelRatio);
		
		if (color) {
			this.ctx.restore();
		}
	};

	Draw.prototype.line = function(x1, y1, x2, y2, color) {
		if (color) {
			this.ctx.save();
			this.ctx.strokeStyle = color;
		}

		this.ctx.beginPath();
		this.ctx.moveTo(x1*this.pixelRatio, y1*this.pixelRatio);
		this.ctx.lineTo(x2*this.pixelRatio, y2*this.pixelRatio);
		this.ctx.stroke();

		if (color) {
			this.ctx.restore();
		}
	};

	Draw.prototype.circle = function(x, y, r, color) {
		if (color) {
			this.ctx.save();
			this.ctx.strokeStyle = color;
		}

		this.ctx.beginPath();
		this.ctx.arc(x*this.pixelRatio, y*this.pixelRatio, r, 0, 2*Math.PI, false);
		this.ctx.closePath();
		this.ctx.stroke();

		if (color) {
			this.ctx.restore();
		}
	};

	

	return Draw;
});






















