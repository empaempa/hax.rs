define({
load: function (name, req, onload, reqconf) {
req( [
	"signals", "config"
], function ( signals, config ) {
	"use strict";

	function Locale() {
		this.onLocaleLoaded = new signals.Signal();

		this.language = "";
		this.translateTable = {};
		this.setLanguage( config.locale.language );

	}

	Locale.prototype.setLanguage = function ( language ) {
		if( this.language !== language /*&& this.languages[ language ] !== undefined*/ ) {
			this.language = language;
			this.loadLocale(this.language);
		}
	}; 

	Locale.prototype.translate = function ( key ) {
		var translation = this.translateTable.core[ key.toLowerCase() ] || key;
		if (key !== translation) {
			//console.log(key, translation);
		}
		return translation;
	};
	Locale.prototype.translateTool = function ( name, method ) {
		var tool = this.translateTable.tools[name.toLowerCase()];
		if (!tool) {
			if (method) {
				return method;
			} else {
				return name;
			}
		} else {
			if (method) {
				return tool.methods[method];
			} else {
				return tool.name;
			}
		}
	};

	Locale.prototype.getDictonary = function () {
		return this.translateTable;
	};
	Locale.prototype.setTranslateTable = function ( table ) {
		// Swap key and value for core table
		for (var key in table.core) {
			var val = table.core[key];
			delete table.core[key];
			if (typeof val === "string") {
				table.core[val] = key;
			} else {
				for (var i = 0; i < val.length; i++) {
					table.core[val[i]] = key;
				}
			}
		}

		this.translateTable = table;
		this.onLocaleLoaded.dispatch();
	}

	Locale.prototype.loadLocale = function ( language ) {


		var self = this;
		req([ "text!locale/"+language+".json" ], function ( table ) {
			self.setTranslateTable( JSON.parse(table) );
		});

	};

	var l = new Locale();
	l.onLocaleLoaded.addOnce(function () {
		
		// Work around signals.js bug
		setTimeout(function () {
			onload(l);
		}, 0);
	});
});
}
});
