define([
	"haxrs",

	"json!config"
], function (haxrs, config) {
	"use strict";

	haxrs.factory("firebase", function () {
		var alreadyInit = false;

		var firebase = {

			url: config.firebase,
			scope: null,
			ref: null,

			init: function ($scope) {
				firebase.scope = $scope;
				if (!alreadyInit) {
					firebase.ref = new Firebase(config.firebase);
				}

				$scope.$on('fbSet', function (e, path, data) {
					console.log(path, data);
					firebase.ref.child(path).set(data);
				});
				$scope.$on('fbUpdate', function (e, path, data) {
					firebase.ref.child(path).update(data);
				});
				$scope.$on('fbRemove', function (e, path) {
					firebase.ref.child(path).remove();
				});
				alreadyInit = true;
			},

			
		};
		return firebase;
	});
});
