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

		$scope.showMethod = function (method) {
			//$scope.method = method;
			method.element[0].scrollIntoView();
		}

		$scope.removeThing = function () {
			var thing = $scope.thing;
			//var pos = $scope.things.indexOf(thing);
			$scope.app.removeThing(thing.name);
			$scope.$emit("fbRemove", "/things/"+thing.name+"/");
			//$scope.thing = $scope.things[Math.min(pos, $scope.things.length-1)];
		}

		$scope.addMethod = function () {
			var name   = $scope.newMethodName;
			var method = $scope.thing.addMethod( name );
			if (method) {
				$scope.$emit("fbSet", "users/"+($scope.session.user?$scope.session.user.id:"anonymous")+"/apps/" + $scope.app.id + "/things/" + method.thing.name+"/methods/"+method.name, JSON.parse(JSON.stringify(method)));
				$scope.newMethodName = "";
			} else {
				alert( "already exists!" );
			}
		}

		$scope.testing = function (method) {
			//console.log(method.editor);
			
			return true;
		};
	};

	haxrs.directive("thing", ThingDirCtrl);
});