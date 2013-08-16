define({
load: function (name, req, onload, reqconf) {
req( [
	"json!config"
], function ( config ) {
	"use strict";

	var toolnames = [];
	for (var i = 0; i < config.tools.length; i++) {
		toolnames.push("tools/"+config.tools[i]);
	}

	req(toolnames, function ( args ) {
		onload(Array.prototype.slice.apply(arguments));
	});
});
}
});
