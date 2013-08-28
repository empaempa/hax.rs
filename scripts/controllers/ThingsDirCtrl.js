define([
	"jquery",
	"haxrs",

	"text!directives/thingsDir.html"
], function( $, haxrs, template ) {
	"use strict";

	function ThingsDirCtrl() {
		var directiveDefinitionObject = {
			template: 	template,
			restrict: 	'E',
			controller: ThingsDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	ThingsDirCtrl.controller = function ( $scope, $element, $timeout ) {
		//$scope.thing = $scope.app.things.Main;

		$scope.addThing = function () {
			var thing = $scope.app.addThing( $scope.newThingName );
			if (thing) {
				$scope.newThingName         = "";
				$scope.app.things[ thing.name ] = thing;
				$scope.$emit( "fbSet", "users/"+($scope.session.user?$scope.session.user.id:"anonymous")+"/apps/" + $scope.app.name + "/things/" + thing.name, JSON.parse( JSON.stringify( thing )));
			} else {
				alert( "Already exists!" );
			}
		};

		$scope.showMethod = function (method) {
			//$scope.method = method;
			method.element[0].scrollIntoView();
		}

		$scope.addMethod = function (scope) {
			var name = scope.newMethodName;
			var method = scope.thing.addMethod( name );
			if (method) {
				$scope.$emit("fbSet", "users/"+($scope.session.user?$scope.session.user.id:"anonymous")+"/apps/" + $scope.app.name + "/things/" + method.thing.name+"/methods/"+method.name, JSON.parse(JSON.stringify(method)));
				scope.newMethodName = "";
			} else {
				alert( "already exists!" );
			}
		}
	};

	haxrs.directive("things", ThingsDirCtrl);
});

