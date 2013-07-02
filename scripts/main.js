require.config({
	paths: {
		jquery  : "libs/jquery",
		angular : "libs/angular",
		cm 		: "libs/cm/codemirror"      
	},
	shim: {
		"angular" : { "exports" : "angular" },
		"cm"      : { "exports" : "cm" }
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
	"app/App" ],
	function( $, angular, Editor, Player, App ) {
		
		"use strict";

    	angular.element( document ).ready( function() {

    		// create module, editor and app

    		var haxrs  = angular.module( "haxrs", [] );
			var editor = new Editor();			
			var app    = new App();

			// just add some working code

			app.getThing( "Main" ).getMethod( "construct" ).code = "this.gubbe = new Gubbe();";
			app.getThing( "Main" ).getMethod( "update"    ).code = "this.gubbe.jump();";

			app.addThing( "Gubbe" );
			app.getThing( "Gubbe" ).getMethod( "construct" ).code = "this.a = 0;";
			app.getThing( "Gubbe" ).addMethod( "jump"      ).code = "this.a++; console.log( this.a );";

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
