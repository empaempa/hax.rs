define({
load: function (name, req, onload, reqconf) {
req( [
	"signals", "json!config"
], function ( signals, config ) {
	"use strict";

	function Locale() {
		this.onLocaleLoaded = new signals.Signal();

		this.language = "";
		this.translateTable = {
			tools: {},
			content: {},
			core: {}
		};
		this.cachedTables = {};
		config.locale.table = this.translateTable;
		this.setLanguage( config.locale.language === "auto" || config.locale.language.length === 0 ? navigator.language.split('-')[0] : config.locale.language );
	}

	Locale.prototype.setLanguage = function ( language ) {
		if( this.language !== language /*&& this.languages[ language ] !== undefined*/ ) {
			this.language = language;
			config.locale.language = this.language;
			this.loadLocale(this.language);
		}
	}; 

	Locale.prototype.translate = function ( key ) {
		var translation = this.translateTable.core[ key.toLowerCase() ] || key;
		if (key !== translation) {
			//console.log(key, translation, this.translateTable.core);
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
		
		//console.log(table, this.translateTable);
		for (var i in table) {
			for (var j in this.translateTable[i]) {
				delete this.translateTable[i][j];
			}
			for (var j in table[i]) {
				this.translateTable[i][j] = table[i][j];
			}
		}

		this.onLocaleLoaded.dispatch();
	}

	Locale.prototype.loadLocale = function ( language ) {
		var self = this;
		if (this.cachedTables[language]) {
			this.setTranslateTable(this.cachedTables[language]);
		} else {
			req([ "json!locale/"+language+".json" ], function ( table ) {

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
				self.cachedTables[language] = table;

				self.setTranslateTable( table );
			});
		}

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
