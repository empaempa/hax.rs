require.config({
	paths: {
		jquery  : "libs/jquery",
		angular : "libs/angular",
		//cm 		: "libs/cm/codemirror",
		signals : "libs/signals.min",
		text    : "libs/require.text",
		directives: "../directives"
	},
	shim: {
		angular : { "exports" : "angular" },
		//cm      : { "exports" : "CodeMirror" }
	},
	priority: [
		"angular"
	]
});

require( [ 
	"jquery",
	"angular",
	"controllers/EditorCtrl",
	"controllers/ThingsDirCtrl",
	"controllers/ThingDirCtrl",
	"controllers/MethodDirCtrl",
	"player/Player",
	"app/App",
	"config",
	"tools/Draw" ],
	function( $, angular, EditorCtrl, ThingsDirCtrl, ThingDirCtrl, MethodDirCtrl, Player, App, config, Draw ) {
		"use strict";

    	angular.element( document ).ready( function() {

    		// create module, editor and app

    		var haxrs  = angular.module( "haxrs", [] );
			var editor = new EditorCtrl();
			var app    = new App();
			haxrs.value( "app", app );

			// just add some working code

			app.getThing( "Main" ).getMethod( "construct" ).code = "min.gubbe = ny Gubbe();";
			app.getThing( "Main" ).getMethod( "update"    ).code = "min.gubbe.hoppa();";

			app.addThing( "Gubbe" );
			app.getThing( "Gubbe" ).getMethod( "construct" ).code = "mitt.a = 0;\nrita.rektangel(1,2,3,4);";
			app.getThing( "Gubbe" ).addMethod( "hoppa"     ).code = "mitt.a++;";

			var st = performance.now();
			app.compile();
			var et = performance.now();
			//console.log("Compiled in", et-st, "ms");

			
			//console.log(app.nativeCode);

			app.run();

			// wire the ng module
			
			haxrs.config( function( $routeProvider ) {
					$routeProvider.
						when( "/", { controller: "EditorCtrl.AppCtrl", templateUrl: "partials/editor.html" } ).
						otherwise( { redirectTo: "/" } );
				}
			);

			haxrs.directive("things", ThingsDirCtrl);
			haxrs.directive("thing", ThingDirCtrl);
			haxrs.directive("methodEditor", MethodDirCtrl);
			

			angular.bootstrap( document, [ 'haxrs' ] );
    	} );
	}
);
