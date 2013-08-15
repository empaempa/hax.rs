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
			
		};

		return ThingsDirCtrl;
	}
);