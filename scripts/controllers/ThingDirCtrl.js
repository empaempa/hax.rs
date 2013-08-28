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

		//$scope.method = $scope.thing.methods.construct;

		$scope.removeThing = function () {
			var thing = $scope.thing;
			//var pos = $scope.things.indexOf(thing);
			$scope.app.removeThing(thing.name);
			$scope.$emit("fbRemove", "/things/"+thing.name+"/");
			//$scope.thing = $scope.things[Math.min(pos, $scope.things.length-1)];
		}

		$scope.testing = function (method) {
			//console.log(method.editor);
			
			return true;
		};
	};

	haxrs.directive("thing", ThingDirCtrl);
});