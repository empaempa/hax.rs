define([
	"angular",

	"text!../partials/editor.html",
	"text!../partials/signup.html",
	"text!../partials/login.html",

	// Load only
	"angularfire"
], function (angular, editorTemplate, signupTemplate, loginTemplate) {
	"use strict";

	var haxrs  = angular.module( "haxrs", ['firebase'] );

	haxrs.config(function( $routeProvider ) {
		$routeProvider.
			when( "/",       { controller: "EditorCtrl.AppCtrl", template: editorTemplate } ).
			when( "/signup", { controller: "EditorCtrl.AppCtrl", template: signupTemplate } ).
			when( "/login",  { controller: "EditorCtrl.AppCtrl", template: loginTemplate  } ).
			otherwise( { redirectTo: "/" } );
	});

	return haxrs;
});