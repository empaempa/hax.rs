define( [ 
	"jquery",
	"angular",
	"text!directives/thingDir.html" ],
	function( $, angular, template ) {
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

		};

		return ThingDirCtrl;
	}
);