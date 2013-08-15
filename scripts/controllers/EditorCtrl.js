define( [ 
	"jquery",
	"angular" ],
	function( $, angular ) {
		"use strict";

		// constructor

		function EditorCtrl() {
			angular.module( "haxrs" ).controller( "EditorCtrl.AppCtrl",    EditorCtrl.appController    );
			angular.module( "haxrs" ).value( "editorCtrl", this );
		}

		// EditorCtrl controllers

		EditorCtrl.appController = function( $scope, app ) {
			$scope.name   = app.name || "MyCoolApp!";
			$scope.things = app.thingsAsArray;
			$scope.thing = app.thingsAsArray[0];
			
			$scope.runApp = function () {
				app.compile();
				$scope.output = app.nativeCode;
				app.run();
			}
		};

		return EditorCtrl;
	}
);