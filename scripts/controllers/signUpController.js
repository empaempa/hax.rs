define( [ 
	"haxrs",
	"json!config",
	"core/Locale!",
	"core/App" ],

	function( haxrs, config, Locale, App ) {

		"use strict";

		function signUpController( $scope, session ) {

			var registerForm = {};

			function signUp() {
				session.signUp( registerForm.name, registerForm.email, registerForm.password );
			}

			$scope.registerForm = registerForm;
			$scope.signUp       = signUp;
		};

		haxrs.controller( "signUpController", signUpController );
	}
);
