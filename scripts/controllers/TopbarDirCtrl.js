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

	TopbarDirCtrl.controller = function( $scope, $element ) {
		
	};

	haxrs.directive("topbar", TopbarDirCtrl);
});
