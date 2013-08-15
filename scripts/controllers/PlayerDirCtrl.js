define( [ 
	"jquery",
	"angular",
	"text!directives/playerDir.html",
	"core/Player" ],
	function( $, angular, template, Player ) {
		"use strict";

		function PlayerDirCtrl() {
			var directiveDefinitionObject = {
				template: template,
				restrict: 'E',
				controller: PlayerDirCtrl.controller
			};
			return directiveDefinitionObject;
		}


		PlayerDirCtrl.controller = function( $scope, $element ) {
			$scope.player = new Player({
				canvas: $element.find(".player-canvas")[0],
				elements: $element.find(".player-elements"),
				app: $scope.app
			});
		};

		return PlayerDirCtrl;
	}
);