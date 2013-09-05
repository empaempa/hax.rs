define( [ 
	"haxrs",
	"json!config",
	"core/Locale!" ],

	function( haxrs, config, Locale ) {
	
		"use strict";

		function dashboardController( $scope, firebase, i18n, session ) {
		}

		haxrs.controller( "dashboardController", dashboardController );
	}
);
