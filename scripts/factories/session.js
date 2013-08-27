define([
	"haxrs",

	"json!config"
], function (haxrs, config) {
	"use strict";

	haxrs.factory("session", function ( $location, angularFireAuth ) {

		var session = {

			user: null,
			scope: null,

			init: function ($scope) {
				angularFireAuth.initialize(config.firebase, {scope: $scope, name: 'session.user', callback: function (err, user) {
					session.user = user;
					err && console.warn(err);
					$scope.safeApply();
				}});
				session.scope = $scope;
			},

			login: function ($scope, form) {
				$scope.isLoggingIn = true;
				angularFireAuth.login("password", {email: form.email, password: form.password}).then(function (user) {
					form.email = '';
					$location.path("/");
				}, function (err) {
					$scope.isLoggingIn = false;
					alert("Login unsuccessful\n"+err);
				});
				form.password = '';
			},
			logout: function ($scope) {
				angularFireAuth.logout();
				$scope.isLoggingIn = false;
			},
			createUser: function ($scope, form) {
				angularFireAuth.createUser(form.email, form.password, function (user) {
					if (user) {
						form.email = '';
						form.password = '';
						$location.path("/login");
					} else {
						alert("Error creating user");
					}
					
				});
				
			}
		};
		return session;
	});
});