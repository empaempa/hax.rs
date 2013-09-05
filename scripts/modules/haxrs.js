define([
	"angular",
	"angularfire",
	"text!controllerTemplates/landing.html",
	"text!controllerTemplates/dashboard.html",
	"text!controllerTemplates/editor.html",
	"text!controllerTemplates/signup.html",
	"text!controllerTemplates/login.html",

], function( angular, angularFire, landingTemplate, dashboardTemplate, editorTemplate, signUpTemplate, loginTemplate ) {

	"use strict";

	var haxrs  = angular.module( "haxrs", [ "firebase" ] );

	haxrs.config(function( $routeProvider ) {
		$routeProvider.
			when( "/",       				{ controller: "landingController",   template: landingTemplate   } ).
			when( "/signup", 				{ controller: "signUpController",    template: signUpTemplate    } ).
			when( "/login",  				{ controller: "loginController",     template: loginTemplate     } ).
			when( "/:userid",       		{ controller: "dashboardController", template: dashboardTemplate } ).
			when( "/editor", 				{ controller: "editorController",    template: editorTemplate    } ).
			when( "/editor/:userID/:appID", { controller: "editorController",    template: editorTemplate    } ).
			otherwise( { redirectTo: "/" } );
	});

	return haxrs;
});