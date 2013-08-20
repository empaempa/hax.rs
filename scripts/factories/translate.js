define([
	"angular",
	"haxrs",

	"json!config"
], function (angular, haxrs, config) {
	"use strict";

	haxrs.factory("i18n", function () {
		return {
			translate: function (key) {
				var out = config.locale.table.content;
				var keys = key.split(".");
				for (var i = 0; i < keys.length && typeof out !== "undefined"; i++) {
					out = out[keys[i]];
				}
				if (typeof out === "undefined") {
					out = "{{translation of "+key+" failed}}";
					console.warn("Translation of "+key+" failed ("+config.locale.language+")");
				}
				return out;
			}
		};
	});
});