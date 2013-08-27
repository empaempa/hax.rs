define( [ 
	"haxrs",

	"json!config",
	"core/Locale!"
], function( haxrs, config, Locale ) {
	"use strict";

	// constructor

	function EditorCtrl() {
		haxrs.controller( "EditorCtrl.AppCtrl",    EditorCtrl.appController    );
		haxrs.value( "editorCtrl", this );
	}

	// EditorCtrl controllers

	EditorCtrl.appController = function( $scope, app, firebase, i18n, session ) {
		
		//var root = new Firebase(config.firebase);
		//var auth = angularFireAuth(root);
		//angularFireAuth.initialize(config.firebase, {scope: $scope, name: 'user'});
		
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

		session.init( $scope );
		firebase.init( $scope );

		$scope.registerForm = {};
		$scope.loginForm = {};
		$scope.session = session;
		$scope.firebase = firebase;

		/*var promise = angularFire(fb, $scope, "thin", {});
		promise.then(function () {

		});*/

		var appref = null;		

		$scope.$on("angularFireAuth:login", function (evt, user) {
			if (appref) {
				appref.off("value");
			}
			appref = firebase.ref.child("users/"+user.id+"/apps/"+app.id);
			appref.on("value", function (data) {
				console.log(data.val());
				app.fromJSON(data.val());
				$scope.safeApply();
			});
		});
		
		

		$scope.app = app;
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
});
