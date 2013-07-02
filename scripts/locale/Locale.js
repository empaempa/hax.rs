define( 
	function() {

		"use strict";

		function Locale() {
			this.language = "se";
			this.languages = {
				"se": {
					"låda": "var",
					"för": "for",
					"gör": "function",
					"tillbaka": "return"
				}
			}
		}

		Locale.prototype.setLanguage = function( language ) {
			if( this.language !== language && this.languages[ language ] !== undefined ) {
				this.language = language;
			}
		}; 

		Locale.prototype.translate = function( key ) {
			return this.languages[ this.language ][ key.toLowerCase() ] || key;
		};

		Locale.prototype.getDictonary = function() {
			return this.languages[ this.language ];
		};

		return new Locale();
	}
);