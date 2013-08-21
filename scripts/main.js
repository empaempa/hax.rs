require.config({
	paths: {
		jquery  : "libs/jquery",
		angular : "https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min",
		angularfire : "libs/angularFire",
		//cm 		: "libs/cm/codemirror",
		signals : "libs/signals.min",
		text    : "libs/require.text",
		json    : "libs/require.json",

		directives: "../directives",
		tools   : "core/tools",
		locale  : "../config/locale",
		config  : "../config/config.json",
		haxrs   : "modules/haxrs"
	},
	shim: {
		angular : { "exports": "angular", "deps": ["jquery"] },
		angularfire : ["angular"]
	},
	priority: [
		"angular"
	]
});

require( [
	"angular",
	"haxrs",

	"controllers/EditorCtrl",

	"core/App",
	"core/Locale!",
	"json!config",

	"util/loader"
], function( angular, haxrs, EditorCtrl, App, Locale, config ) {
	"use strict";

	var fb = new Firebase(config.firebase+"things");
	config.fb = fb;

	var editor = new EditorCtrl();
	var app    = new App();
	haxrs.value( "app", app );

	// just add some working code
	/*app.getThing( "Main" ).getMethod( "construct" ).code = "min.gubbe = ny Gubbe();";
	app.getThing( "Main" ).getMethod( "update"    ).code = "min.gubbe.hoppa(deltaTime);";

	app.addThing( "Gubbe" );
	app.getThing( "Gubbe" ).getMethod( "construct" ).code = "mitt.a = 0; min.färg = \"orange\"";
	app.getThing( "Gubbe" ).addMethod( "hoppa"     ).addParameter( "t" ).code = "mitt.a += 0.1;\nrityta.rensa();\nrita.rektangel(mus.x-25,mus.y-25,50,50, \"pink\");\nrita.rektangel(Math.cos(t/100)*30+30,Math.sin(t/100)*30+30,30,30, min.färg);";
	*/
	//console.log(app.nativeCode);

	// wire the ng module

	angular.bootstrap( document, [ 'haxrs' ] );


});
