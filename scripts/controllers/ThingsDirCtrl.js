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

		$scope.addThing = function () {
			var thing = $scope.app.addThing( $scope.newThingName );
			if (thing) {
				$scope.newThingName         = "";
				$scope.things[ thing.name ] = thing;
				$scope.$emit( "fbSet", "/things/" + thing.name + "/", JSON.parse( JSON.stringify( thing )));
			} else {
				alert( "Already exists!" );
			}
		}

		$scope.showThing = function ( thing ) {
			$scope.thing = thing;
			$scope.currentThing = thing.name;
		}

		$scope.thing = $scope.app.things.Main;
	};

	haxrs.directive("things", ThingsDirCtrl);
});