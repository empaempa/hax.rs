define( {
	load: function( name, req, onload, reqconf ) {
		req( [
			"signals", "json!config" ], 
			function( signals, config ) {
			
				"use strict";

				function Locale() {
					this.onLocaleLoaded = new signals.Signal();

					this.language = "";
					this.translateTable = {
						tools 	: {},
						content : {},
						core 	: {}
					};

					this.cachedTables = {};
					config.locale.table = this.translateTable;
					this.setLanguage( config.locale.language === "auto" || config.locale.language === undefined ? navigator.language.split( "-" )[ 0 ] : config.locale.language );
				}

				Locale.prototype.setLanguage = function( language ) {
					if( this.language !== language ) {
						config.locale.language = this.language = language;
						this.loadLocale( this.language );
					}
				}; 

				Locale.prototype.translate = function( key ) {
					return this.translateTable.core[ key.toLowerCase() ] || key;
				};

				Locale.prototype.translateApp = function( key ) {
					return this.translateTable.content.app[ key ] || key;
				};

				Locale.prototype.translateTool = function( name, method ) {
					var tool = this.translateTable.tools[ name.toLowerCase() ];
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

				Locale.prototype.getDictonary = function() {
					return this.translateTable;
				};

				Locale.prototype.setTranslateTable = function( table ) {
					for( var i in table ) {
						for( var j in this.translateTable[ i ] ) {
							delete this.translateTable[ i ][ j ];
						}
						for(var j in table[ i ]) {
							this.translateTable[ i ][ j ] = table[ i ][ j ];
						}
					}

					this.onLocaleLoaded.dispatch();
				};

				Locale.prototype.loadLocale = function ( language ) {
					var self = this;
					if( this.cachedTables[ language ] ) {
						this.setTranslateTable( this.cachedTables[ language ]);
					} else {
						req( [ "json!locale/" + language + ".json" ], function ( table ) {

							// Swap key and value for core table
							for( var key in table.core ) {
								var val = table.core[ key ];
								delete table.core[ key ];
								if( typeof val === "string" ) {
									table.core[ val ] = key;
								} else {
									for( var i = 0; i < val.length; i++ ) {
										table.core[ val[ i ]] = key;
									}
								}
							}
							self.cachedTables[language] = table;
							self.setTranslateTable( table );
						} );
					}
				};

				var locale = new Locale();
				
				locale.onLocaleLoaded.addOnce( function() {
					setTimeout( function() {
						onload( locale );
					}, 0);
				});
			}
		);
	}
});
