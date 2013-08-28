define([
	"angular",

	"text!../partials/dashboard.html",
	"text!../partials/editor.html",
	"text!../partials/signup.html",
	"text!../partials/login.html",

	// Load only
	"angularfire"
], function (angular, dashboardTemplate, editorTemplate, signupTemplate, loginTemplate) {
	"use strict";

	var haxrs  = angular.module( "haxrs", ['firebase'] );

	haxrs.config(function( $routeProvider ) {
		$routeProvider.
			when( "/",       { controller: "AppCtrl.DashboardCtrl", template: dashboardTemplate } ).
			when( "/editor", { controller: "AppCtrl.EditorCtrl", template: editorTemplate } ).
			when( "/editor/:name", { controller: "AppCtrl.EditorCtrl", template: editorTemplate } ).
			when( "/signup", { controller: "AppCtrl.EditorCtrl", template: signupTemplate } ).
			when( "/login",  { controller: "AppCtrl.EditorCtrl", template: loginTemplate  } ).
			otherwise( { redirectTo: "/" } );
	});

	return haxrs;
});