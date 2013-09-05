define([ 
	"haxrs",
	"text!directiveTemplates/thing.html" ],

	function( haxrs, template ) {
	
		"use strict";

		function ThingDirective() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: ThingDirective.controller
			};
		}

		ThingDirective.controller = function( $scope, $element ) {
			$scope.removeThing = function () {
				var thing = $scope.thing;
				$scope.app.removeThing( thing.name );
				$scope.$emit( "fbRemove", "/things/" + thing.name + "/" );
			}
		};

		haxrs.directive( "thing", ThingDirective );

		return ThingDirective;
	}
);
