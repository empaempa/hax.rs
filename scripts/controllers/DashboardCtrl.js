define( [ 
	"haxrs",

	"json!config",
	"core/Locale!"
], function( haxrs, config, Locale ) {
	"use strict";

	// constructor

	function DashboardCtrl() {
		haxrs.controller( "AppCtrl.DashboardCtrl",    DashboardCtrl.controller    );
	}

	// DashboardCtrl controllers

	DashboardCtrl.controller = function( $scope, firebase, i18n, session ) {
		
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
				$scope.userdata = data.val();
				$scope.safeApply();
			});
		}

		

	};

	return DashboardCtrl;
});
