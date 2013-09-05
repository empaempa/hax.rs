define( [ 
	"haxrs",
	"json!config",
	"core/Locale!",
	"core/App" ],

	function( haxrs, config, Locale, App ) {

		"use strict";

		// constructor

		function loginController( $scope, $routeParams, $location, firebase, i18n, session ) {

			var loginForm = {};

			function login() {
				session.login( loginForm.email, loginForm.password );
			}

			$scope.loginForm = loginForm;
			$scope.login     = login;
		};

		haxrs.controller( "loginController", loginController );
	}
);
