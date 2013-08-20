define([
	"angular",

	"text!../partials/editor.html",

	// Load only
	"angularfire"
], function (angular, editorTemplate) {
	"use strict";

	var haxrs  = angular.module( "haxrs", ['firebase'] );

	haxrs.config(function( $routeProvider ) {
		$routeProvider.
			when( "/", { controller: "EditorCtrl.AppCtrl", template: editorTemplate } ).
			when( "/login", { controller: "EditorCtrl.AppCtrl", template: "" }).
			otherwise( { redirectTo: "/" } );
	});

	return haxrs;
});