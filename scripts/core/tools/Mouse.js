define( [
	"jquery",
	"tools/Tool"
], function( $, Tool ) {
		"use strict";

		function Mouse(player) {
			Tool.call(this);
			var self = this;
			
			this.canvas = player.canvas;
			this.x = 0;
			this.y = 0;

			var jqCanvas = $(this.canvas);

			this.onMouseMove = function (e) {
				if (!player.program || player.program.paused) return;
				var offset = jqCanvas.offset();
				var xpos = e.pageX - offset.left;
				var ypos = e.pageY - offset.top;
				self.x = xpos;
				self.y = ypos;
			};

			this.canvas.addEventListener('mousemove', this.onMouseMove, false);
		}
		Mouse.translated = false;
		Mouse.prototype = Object.create(Tool.prototype);
		Mouse.prototype.constructor = Mouse;

		Mouse.prototype.destroy = function() {
			this.canvas.removeEventListener('mousemove', this.onMouseMove, false);
		};

		

		return Mouse;
	}
);