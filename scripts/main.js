// setup require

require.config( {
	paths: {
		jquery  	: "libs/jquery",
		angular 	: "https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min",
		angularfire : "libs/angularFire",
		signals 	: "libs/signals.min",
		text    	: "libs/require.text",
		json    	: "libs/require.json",

		directiveTemplates 	: "../templates/directives",
		controllerTemplates : "../templates/controllers",

		tools   	: "core/tools",
		locale  	: "../config/locale",
		config  	: "../config/config.json",
		haxrs   	: "modules/haxrs"
	},
	shim: {
		angular 	: { "exports": "angular", "deps": [ "jquery" ] },
		angularfire : [ "angular" ]
	},
	priority: [
		"angular"
	]
} );

require( [
	"angular",
	"haxrs",
	"core/Locale!",
	"json!config",
	"util/loadAllAngular" ],

	function( angular, haxrs, Locale, config ) {
	
		"use strict";

		angular.bootstrap( document, [ 'haxrs' ] );
	}
);
