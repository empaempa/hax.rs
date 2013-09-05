define([
	"haxrs",
	"text!directiveTemplates/player.html",
	"core/Player" ],

	function( haxrs, template, Player ) {
	
		"use strict";

		function PlayerDirecitve() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: PlayerDirecitve.controller
			};
		}

		PlayerDirecitve.controller = function( $scope, $element ) {
			$scope.player = new Player( {
				canvas: $element.find(".player-canvas")[0],
				elements: $element.find(".player-elements"),
				app: $scope.app
			});

			$scope.$on( "$destroy", function() {
				$scope.player.stop();
			});
		};

		haxrs.directive( "player", PlayerDirecitve );

		return PlayerDirecitve;
	}
);