define( [ 
	"jquery",
	"haxrs",
	"text!directiveTemplates/loader.html" ],

	function( $, haxrs, template ) {
	
		"use strict";

		function LoaderDirective() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: LoaderDirective.controller
			};
		}

		LoaderDirective.controller = function( $scope, $element, firebase ) {
			$( "#loader" ).click( function( event ) {
				event.preventDefault();
			});
		};

		haxrs.directive( "loader", LoaderDirective );

		return LoaderDirective;
	}
);