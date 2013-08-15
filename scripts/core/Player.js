define([
	"core/Compiler",
	"util/helpers",
	"tools/Draw"
], function (Compiler, helpers, Draw) {


	function Player (params) {
		this.app = params.app || null;
		this.canvas = params.canvas || document.createElement('canvas');
		this.elements = params.elements || $("<div/>");

		this.ctx = this.canvas.getContext("2d");

		console.log("hej");
	}

	Player.prototype.run = function() {

		var st = performance.now();

		var runable = Compiler.build( this.app );

		var et = performance.now();
		console.log("Compiled in", et-st, "ms");
		
		var toolchain = [
			new Draw({
				canvas: this.canvas,
				ctx: this.ctx
			})
		];

		helpers.construct(runable, toolchain);
	};

	Player.prototype.stop = function() {
		console.log("stop");
	};

	Player.prototype.loadApp = function(app) {
		this.app = app;
	};

	return Player;
});