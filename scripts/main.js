require.config({
	paths: {
		jquery  : "libs/jquery",
		angular : "libs/angular",
		//cm 		: "libs/cm/codemirror",
		signals : "libs/signals.min",
		text    : "libs/require.text",
		json    : "libs/require.json",

		directives: "../directives",
		tools   : "core/tools",
		locale  : "../config/locale",
		config  : "../config/config.json"
	},
	shim: {
		angular : { "exports" : "angular" }
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
	"controllers/PlayerDirCtrl",

	"core/App",
	"core/Locale!",
	"json!config"],
	function( $, angular, EditorCtrl, ThingsDirCtrl, ThingDirCtrl, MethodDirCtrl, PlayerDirCtrl, App, Locale, config ) {
		"use strict";

		angular.element( document ).ready( function() {

			// create module, editor and app

			var haxrs  = angular.module( "haxrs", [] );
			var editor = new EditorCtrl();
			var app    = new App();
			haxrs.value( "app", app );

			// just add some working code

			app.getThing( "Main" ).getMethod( "construct" ).code = "min.gubbe = ny Gubbe();";
			app.getThing( "Main" ).getMethod( "update"    ).code = "min.gubbe.hoppa(deltaTime);";

			app.addThing( "Gubbe" );
			app.getThing( "Gubbe" ).getMethod( "construct" ).code = "mitt.a = 0; min.färg = \"orange\"";
			app.getThing( "Gubbe" ).addMethod( "hoppa"     ).addParameter( "t" ).code = "mitt.a += 0.1;\nrityta.rensa('red');\nrita.rektangel(mus.x-25,mus.y-25,50,50, \"pink\");\nrita.rektangel(Math.cos(t/100)*30+30,Math.sin(t/100)*30+30,30,30, min.färg);";
			
			//console.log(app.nativeCode);

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
			haxrs.directive("player", PlayerDirCtrl);
			

			angular.bootstrap( document, [ 'haxrs' ] );
    	});
	}
);
