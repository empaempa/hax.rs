define([
	"haxrs",

	"json!config"
], function (haxrs, config) {
	"use strict";

	haxrs.factory("session", function ( $location, angularFireAuth ) {
		var alreadyInit = false;
		var session = {

			user: null,
			scope: null,

			init: function ($scope) {
				if (!alreadyInit) {
					angularFireAuth.initialize(config.firebase, {scope: $scope, name: 'session.user', callback: function (err, user) {
						session.user = user;
						err && console.warn(err);
						$scope.safeApply();
					}});
				}
				session.scope = $scope;
				$scope.session = session;
				alreadyInit = true;
			},

			login: function ($scope, form, cb) {
				$scope.isLoggingIn = true;
				angularFireAuth.login("password", {email: form.email, password: form.password}).then(function (user) {
					form.email = '';
					$location.path("/");
					if (typeof cb === 'function') {
						cb(user);
					}
				}, function (err) {
					$scope.isLoggingIn = false;
					alert("Login unsuccessful\n"+err);
				});
				form.password = '';
			},
			logout: function ($scope) {
				angularFireAuth.logout();
				$scope.isLoggingIn = false;
				$location.path("/login");
			},
			createUser: function ($scope, form) {
				angularFireAuth.createUser(form.email, form.password, function (user) {
					if (user) {
						//session.logout($scope);
						//console.log(form);
						session.login($scope, form, function () {
							$scope.$emit("fbSet", "users/"+user.id+"/name", form.name);
						});
						form.email = '';
						form.password = '';
					} else {
						alert("Error creating user");
					}
					
				});
				
			}
		};
		return session;
	});
});