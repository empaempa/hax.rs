define( [ 
	"jquery",
	"angular",

	"json!config",
	"core/Locale!" ],
	function( $, angular, config, Locale ) {
		"use strict";

		// constructor

		function EditorCtrl() {
			angular.module( "haxrs" ).controller( "EditorCtrl.AppCtrl",    EditorCtrl.appController    );
			angular.module( "haxrs" ).value( "editorCtrl", this );
		}

		// EditorCtrl controllers

		EditorCtrl.appController = function( $scope, app, angularFireAuth ) {
			
			//var root = new Firebase(config.firebase);
			//var auth = angularFireAuth(root);
			angularFireAuth.initialize(config.firebase);
			$scope.name   = app.name || "MyCoolApp!";
			
			$scope.things = app.thingsAsArray;
			$scope.thing = app.thingsAsArray[0];

			$scope.session = {
				user: {
					email: '',
					password: '',
					id: -1
				}
			};

			$scope.app = app;
			$scope.config = config;

			$scope.language = config.locale.languages[config.locale.language];

			$scope.i18n = function (key) {
				var out = config.locale.table.content;
				var keys = key.split(".");
				for (var i = 0; i < keys.length && typeof out !== "undefined"; i++) {
					out = out[keys[i]];
				}
				if (typeof out === "undefined") {
					out = "{{translation of "+key+" failed)}}";
					console.warn("Translation of "+key+" failed ("+config.locale.language+")");
				}
				return out;
			};

			$scope.changeLanguage = function () {

				Locale.onLocaleLoaded.addOnce($scope.safeApply.bind(this));
				Locale.setLanguage($scope.language);
				$scope.language = config.locale.languages[$scope.language];
			};
			$scope.addUser = function ($element) {
				angularFireAuth.createUser($scope.session.user.email, $scope.session.user.password, function (user) {
					console.log(user);
				});
				$scope.session.user.password = '';
			};
		};

		return EditorCtrl;
	}
);