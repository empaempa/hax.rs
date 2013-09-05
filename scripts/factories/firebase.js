define([
	"haxrs",
	"json!config" ],

	function (haxrs, config) {
	
		"use strict";

		haxrs.factory( "firebase", function( $rootScope, safeApply ) {

			var firebase = new Firebase( config.firebase );

			$rootScope.$on( "fbSet", function( e, path, data, callback ) {
				firebase.child( path ).set( data, callback );
			});
			$rootScope.$on( "fbUpdate", function( e, path, data, callback ) {
				firebase.child( path ).update( data, callback );
			});
			$rootScope.$on( "fbRemove", function( e, path, callback ) {
				firebase.child( path ).remove( callback );
			});

			$rootScope.firebase = firebase;

			return firebase;
		});
	}
);
