define( [ 
	"haxrs",

	"json!config",
	"core/Locale!",
	"core/App"
], function( haxrs, config, Locale, App ) {
	"use strict";

	// constructor

	function EditorCtrl() {
		haxrs.controller( "AppCtrl.EditorCtrl",    EditorCtrl.controller    );
		haxrs.value( "editorCtrl", this );
	}

	// EditorCtrl controllers

	EditorCtrl.controller = function( $scope, firebase, i18n, session, $routeParams, $location ) {
		
		var appid = $routeParams.appid;
		var userid = $routeParams.userid;

		var app = new App({owner: userid, id: appid});

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

		firebase.ref.child("users/"+userid+"/apps/"+appid).on("value", function (data) {
			app.fromJSON(data.val());
			$scope.safeApply();
		});

		var appref = null;

		$scope.$on("angularFireAuth:login", function (evt, user) {
			updateUserData();
		});
		if (session.user) {
			updateUserData();
		}

		function updateUserData() {
			if (appref) {
				appref.off("value");
			}
			appref = firebase.ref.child("users/"+session.user.id);
			appref.on("value", function (data) {
				var userdata = data.val() || {};
				if (!userdata.apps) {
					userdata.apps = {};
				}

				var o = {};
				
				for (var i in userdata.apps) {
					o[i] = userdata.apps[i];
				}
				userdata.apps = o;

				$scope.userdata = userdata;
				$scope.safeApply();
			});
		}
		

		
		

		$scope.app = app;
		$scope.config = config;

		$scope.i18n = i18n.translate;

		$scope.language = config.locale.languages[config.locale.language];

		$scope.changeLanguage = function () {
			Locale.onLocaleLoaded.addOnce($scope.safeApply.bind(this));
			Locale.setLanguage($scope.language);
			$scope.language = config.locale.languages[$scope.language];
		};

		$scope.pusher = function () {
			$scope.thin.date = Date.now();

		};
	};

	return EditorCtrl;
});
