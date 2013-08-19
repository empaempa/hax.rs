define( [ 
	"jquery",
	"angular",
	"text!directives/thingsDir.html",
	"json!config" ],
	function( $, angular, template, config ) {
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
			$scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					this.$apply(fn);
				}
			};
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