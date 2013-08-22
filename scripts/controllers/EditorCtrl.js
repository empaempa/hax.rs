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

		EditorCtrl.appController = function( $scope, app, angularFireAuth, i18n, session ) {
			
			//var root = new Firebase(config.firebase);
			//var auth = angularFireAuth(root);
			//angularFireAuth.initialize(config.firebase, {scope: $scope, name: 'user'});
			
			session.init( $scope );

			$scope.name = app.name;
			
			$scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					this.$apply(fn);
				}
			};

			$scope.registerForm = {};
			$scope.loginForm = {};
			$scope.session = session;


			$scope.firebase = config.fb;

			/*var promise = angularFire(fb, $scope, "thin", {});
			promise.then(function () {

			});*/
			config.fb.child("a").on('value', function (data) {
				//console.log("DATABASE UPDATE");
				//console.log(data.val());
				app.fromJSON(data.val());
				$scope.safeApply();
			});
			
			$scope.$on('fbSet', function (e, path, data) {
				console.log(path, data);
				config.fb.child("a"+path).set(data);
			});
			$scope.$on('fbUpdate', function (e, path, data) {
				config.fb.child("a"+path).update(data);
			});
			$scope.$on('fbRemove', function (e, path) {
				config.fb.child("a"+path).remove();
			});
			
			

			$scope.app = app;
			$scope.things = app.things;
			$scope.config = config;

			$scope.i18n = i18n.translate;

			$scope.language = config.locale.languages[config.locale.language];

			$scope.changeLanguage = function () {
				Locale.onLocaleLoaded.addOnce($scope.safeApply.bind(this));
				Locale.setLanguage($scope.language);
				$scope.language = config.locale.languages[$scope.language];
			};

			$scope.loginUser = function () {
				session.login($scope, $scope.loginForm);
			};

			$scope.logoutUser = function () {
				session.logout($scope);
			};

			$scope.addUser = function () {
				session.createUser($scope, $scope.registerForm);
			};

			$scope.pusher = function () {
				$scope.thin.date = Date.now();

			};
		};

		return EditorCtrl;
	}
);