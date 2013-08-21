define([ 
	"haxrs",
	
	"text!directives/thingDir.html"
], function( haxrs, template ) {
	"use strict";

	function ThingDirCtrl() {
		var directiveDefinitionObject = {
			template: template,
			restrict: 'E',
			controller: ThingDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	ThingDirCtrl.controller = function( $scope, $element ) {
		$scope.removeThing = function () {
			var thing = $scope.thing;
			//var pos = $scope.things.indexOf(thing);
			$scope.app.removeThing(thing.name);
			$scope.$emit("fbRemove", "/things/"+thing.name+"/");
			//$scope.thing = $scope.things[Math.min(pos, $scope.things.length-1)];
		}

		$scope.addMethod = function () {
			var name = $scope.methodName;
			var method = $scope.thing.addMethod( name );
			if (method) {
				$scope.$emit("fbSet", "/things/"+method.thing.name+"/methods/"+method.name, JSON.parse(JSON.stringify(method)));
				$scope.methodName = "";
			}
		}
	};

	haxrs.directive("thing", ThingDirCtrl);
});