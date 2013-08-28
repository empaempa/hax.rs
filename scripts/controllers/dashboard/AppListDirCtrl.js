define([
	"jquery",
	"haxrs",
	"core/App",

	"text!directives/dashboard/appListDir.html"
], function( $, haxrs, App, template ) {
	"use strict";

	function AppListDirCtrl() {
		var directiveDefinitionObject = {
			template: 	template,
			restrict: 	'E',
			controller: AppListDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	AppListDirCtrl.controller = function ( $scope, $element, $timeout, firebase, $location ) {
			
		$scope.addApp = function () {
			var name = $scope.newAppName;
			if (!$scope.userdata || !name || !$scope.session || !$scope.session.user) {
				return;
			}

			if (!$scope.userdata.apps[name]) {
				var app = new App({name: name, owner: $scope.session.user.id});
				app.addMainThing();
				console.log(JSON.parse( JSON.stringify( app )));
				firebase.ref.child("appcount").transaction(function (currentCount) {
					console.log(currentCount);
					return currentCount + 1;
				}, function (err, commited, snapshot) {
					var appsref = firebase.ref.child("users/"+$scope.session.user.id+"/apps/"+snapshot.val()+"/");
					appsref.set(JSON.parse( JSON.stringify( app )));
					console.log("editor/"+$scope.session.user.id+"/"+snapshot.val());

					$location.path("/editor/"+$scope.session.user.id+"/"+snapshot.val());
					$scope.safeApply();
				});
				$scope.newAppName = "";
				//$scope.$emit( "fbSet",  + app.name, JSON.parse( JSON.stringify( app )));
			} else {
				alert( "An app with that name already exists!" );
			}
		};

		$scope.removeApp = function ( scope ) {
			var app = scope.app;
			var id = scope.id;

			if (confirm("Are you sure you want to remove the app '"+app.name+"'?")) {
				$scope.$emit("fbRemove", "users/"+$scope.session.user.id+"/apps/"+id+"/");
			}
		};

	};

	haxrs.directive("applist", AppListDirCtrl);
});

