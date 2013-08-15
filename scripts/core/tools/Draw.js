define( [
		"tools/Tool" ],
	function( Tool ) {

		"use strict";

		function Draw() {
			Tool.call(this);
		}
		Draw.prototype = Object.create(Tool.prototype);
		Draw.prototype.constructor = Draw;

		Draw.prototype.rectangle = function (x, y, w, h) {
			console.log(arguments);
		}
		Draw.translated = false;

		

		return Draw;
	}
);