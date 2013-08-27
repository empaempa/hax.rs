define([
	"haxrs",

	"json!config"
], function (haxrs, config) {
	"use strict";

	haxrs.factory("firebase", function () {

		var firebase = {

			url: config.firebase,
			scope: null,
			ref: null,

			init: function ($scope) {
				firebase.ref = new Firebase(config.firebase);
				firebase.scope = $scope;

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

			},

			
		};
		return firebase;
	});
});
