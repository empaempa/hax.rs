define([
	"haxrs",

	"text!directives/thingsDir.html"
], function( haxrs, template ) {
	"use strict";

	function ThingsDirCtrl() {
		var directiveDefinitionObject = {
			template: template,
			restrict: 'E',
			controller: ThingsDirCtrl.controller
		};

		return directiveDefinitionObject;
	}


	ThingsDirCtrl.controller = function( $scope, $element ) {
		$scope.addThing = function () {
			var thing = $scope.app.addThing($scope.thingName);
			if (thing) {
				$scope.thingName = '';
				$scope.things[thing.name] = thing;
				$scope.$emit("fbSet", "/things/"+thing.name+"/", JSON.parse(JSON.stringify(thing)));
			}
		}
		
	};

	haxrs.directive("things", ThingsDirCtrl);
});