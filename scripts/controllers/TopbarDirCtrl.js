define([ 
	"haxrs",
	
	"text!directives/topbarDir.html"
], function( haxrs, template ) {
	"use strict";

	function TopbarDirCtrl() {
		var directiveDefinitionObject = {
			template: template,
			restrict: 'E',
			controller: TopbarDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	TopbarDirCtrl.controller = function( $scope, $element, $location ) {
		$scope.login = function() {
			$location.path( "login" );
		};

		$scope.signup = function() {
			$location.path( "signup" );
		};

		$scope.home = function() {
			$location.path( "" );
		}
	};

	haxrs.directive("topbar", TopbarDirCtrl);
});
