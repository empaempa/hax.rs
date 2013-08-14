define( [
	"locale/Locale!"
], function( Locale ) {
	"use strict";

	var tools = [];

	function Tool() {
		tools.push(this);
		this.type = this.constructor.name.toLowerCase();
		this.translate();
	}

	Tool.prototype.translate = function () {
		if (this.constructor.translated) {
			console.log("Skipping translate of", this.constructor.name);
			return;
		}

		var lang = Locale.language;

		var translateTable = Locale.translateTable.tools[this.type].methods || {};
		for (var en in translateTable) {
			var translation = translateTable[en];
			this.constructor.prototype[translation] = this.constructor.prototype[en];
		}

		this.constructor.translated = true;
	};
	
	Tool.translateAll = function () {
		for (var i = 0; i < tools.length; i++) {
			Tool.prototype.translate.call(tools[i]);
		}
	}

	Locale.onLocaleLoaded.add(Tool.translateAll);
	Tool.translateAll();

	return Tool;
});