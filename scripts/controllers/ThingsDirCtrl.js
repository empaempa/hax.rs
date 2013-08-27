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

		$scope.currentThing = "Main";
		//$scope.thing = $scope.app.things.Main;

		$scope.addThing = function () {
			var thing = $scope.app.addThing( $scope.newThingName );
			if (thing) {
				$scope.newThingName         = "";
				$scope.app.things[ thing.name ] = thing;
				$scope.$emit( "fbSet", "users/"+($scope.session.user?$scope.session.user.id:"anonymous")+"/apps/" + $scope.app.id + "/things/" + thing.name, JSON.parse( JSON.stringify( thing )));
			} else {
				alert( "Already exists!" );
			}
		}

		$scope.showThing = function ( thing ) {
			$scope.thing = thing;
			$scope.currentThing = thing.name;
		}
	};

	haxrs.directive("things", ThingsDirCtrl);
});

