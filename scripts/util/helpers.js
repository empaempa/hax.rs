define([], function () {
	"use strict";

	var helpers = {};

	helpers.construct = function (constructor, args) {
		function F() {
			return constructor.apply(this, args);
		}
		F.prototype = constructor.prototype;
		return new F();
	};

	helpers.now = function () {
		return typeof performance === "object" && typeof performance.now === "function" ? performance.now() : new Date().getTime();
	};

	return helpers;
});
