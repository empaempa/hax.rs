define( [ 
	"jquery",
	"angular",
	"cm" ],
	function( $, angular, CM ) {

		"use strict";

		// constructor

		function Editor() {
			angular.module( "haxrs" ).controller( "Editor.AppCtrl",    Editor.appController    );
			angular.module( "haxrs" ).controller( "Editor.ThingCtrl",  Editor.thingController  );
			angular.module( "haxrs" ).controller( "Editor.MethodCtrl", Editor.methodController );
			angular.module( "haxrs" ).value( "editor", this );
		}

		// editor controllers

		Editor.appController = function( $scope, app ) {
			$scope.name   = app.name || "MyCoolApp!";
			$scope.things = app.things;
		};

		Editor.thingController = function( $scope ) {
		};

		Editor.methodController = function( $scope, $element ) {

			var method        = $scope.$parent.method;				// feels hackish but couldn't figure out how to get it
			var editorElement = $element.find( ".cm" )[ 0 ];		// searches for the code mirror class

			var editor = CodeMirror( editorElement, {
				value:  method.code,
				mode:   "javascript",
				indent: true
			} );

			editor.on( "change", function() {
				method.code = editor.getValue();
			} );
		};

		// editor directives

		Editor.somethingDirective = function() {
			// maybe the code mirror should be a directive?
		}

		return Editor;
	}
);