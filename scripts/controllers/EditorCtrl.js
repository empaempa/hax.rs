define( [ 
	"haxrs",

	"json!config",
	"core/Locale!" ],
	function( haxrs, config, Locale ) {
		"use strict";

		// constructor

		function EditorCtrl() {
			haxrs.controller( "EditorCtrl.AppCtrl",    EditorCtrl.appController    );
			haxrs.value( "editorCtrl", this );
		}

		// EditorCtrl controllers

		EditorCtrl.appController = function( $scope, app, angularFireAuth, i18n ) {
			
			//var root = new Firebase(config.firebase);
			//var auth = angularFireAuth(root);
			angularFireAuth.initialize(config.firebase, {scope: $scope, name: 'user'});
			$scope.name   = app.name || "MyCoolApp!";
			
			$scope.registerForm = {};
			$scope.loginForm = {};

			$scope.things = app.thingsAsArray;
			$scope.thing = app.thingsAsArray[0];

			$scope.app = app;
			$scope.config = config;

			$scope.i18n = i18n.translate;

			$scope.language = config.locale.languages[config.locale.language];

			$scope.changeLanguage = function () {

				Locale.onLocaleLoaded.addOnce($scope.safeApply.bind(this));
				Locale.setLanguage($scope.language);
				$scope.language = config.locale.languages[$scope.language];
			};

			$scope.login = function () {
				var smth = angularFireAuth.login("password", {email: $scope.loginForm.email, password: $scope.loginForm.password});
				$scope.loginForm.password = '';
				smth.then(function (user) {console.log(user)}, function (err) {console.error(err)});
			};

			$scope.logout = function () {
				console.log($scope.user);
				angularFireAuth.logout();
			};

			$scope.addUser = function () {
				angularFireAuth.createUser($scope.registerForm.email, $scope.registerForm.password, function (user) {
					console.log(user);
				});
				$scope.registerForm.password = '';
			};
		};

		return EditorCtrl;
	}
);