define([
	"jquery",
	"haxrs",

	"text!directives/dashboard/appListDir.html"
], function( $, haxrs, template ) {
	"use strict";

	function AppListDirCtrl() {
		var directiveDefinitionObject = {
			template: 	template,
			restrict: 	'E',
			controller: AppListDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	AppListDirCtrl.controller = function ( $scope, $element, $timeout ) {
			
		

	};

	haxrs.directive("applist", AppListDirCtrl);
});

