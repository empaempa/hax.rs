require.config({
	paths: {
		jquery  : "libs/jquery",
		angular : "libs/angular",
		cm 		: "libs/cm/codemirror",
		signals : "libs/signals.min",
		text    : "libs/require.text"
	},
	shim: {
		angular : { "exports" : "angular" },
		cm      : { "exports" : "CodeMirror" }
	},
	priority: [
		"angular"
	]
});

require( [ 
	"jquery",
	"angular",
	"editor/Editor",
	"player/Player",
	"app/App",
	"config",
	"tools/Draw" ],
	function( $, angular, Editor, Player, App, config, Draw ) {
		"use strict";

    	angular.element( document ).ready( function() {

    		// create module, editor and app

    		var haxrs  = angular.module( "haxrs", [] );
			var editor = new Editor();
			var app    = new App();

			// just add some working code

			app.getThing( "Main" ).getMethod( "construct" ).code = "min.gubbe = ny Gubbe();";
			app.getThing( "Main" ).getMethod( "update"    ).code = "min.gubbe.hoppa();";

			app.addThing( "Gubbe" );
			app.getThing( "Gubbe" ).getMethod( "construct" ).code = "mitt.a = 0;\nrita.rektangel(1,2,3,4);";
			app.getThing( "Gubbe" ).addMethod( "hoppa"     ).code = "mitt.a++;";

			var st = performance.now();
			app.compile();
			var et = performance.now();
			console.log("Compiled in", et-st, "ms");

			var executable = app.getRunable();

			//console.log(executable);
			console.log(app.nativeCode);

			new executable(new Draw());

			// wire the ng module

			haxrs.value( "app", app );
			haxrs.config( function( $routeProvider ) {
					$routeProvider.
						when( "/", { controller: "Editor.AppCtrl", templateUrl: "partials/editor.html" } ).
						otherwise( { redirectTo: "/" } );
				}
			);

			angular.bootstrap( document, [ 'haxrs' ] );
    	} );
	}
);
