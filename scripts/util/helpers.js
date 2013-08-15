define([], function () {
	var helpers = {};
	helpers.construct = function (constructor, args) {
		function F() {
			return constructor.apply(this, args);
		}
		F.prototype = constructor.prototype;
		return new F();
	}

	return helpers;
});
