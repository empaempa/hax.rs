define( [ 
	"jquery",
	"angular",
	"text!directives/thingsDir.html" ],
	function( $, angular, template ) {
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
					$scope.thing = thing;
				}
			}
		};

		return ThingsDirCtrl;
	}
);