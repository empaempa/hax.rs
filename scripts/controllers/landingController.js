define( [ 
	"haxrs",
	"json!config",
	"core/Locale!"  ],

	function( haxrs, config, Locale ) {

		"use strict";

		function landingController( $scope, $routeParams, $location, session, firebase, safeApply, i18n ) {
			// redirect to editor if logged in

			$scope.$on( "angularFireAuth:login", function( evt, user ) {
				$location.path( "/editor/" + session.user.id + "/" );
			});
		};

		haxrs.controller( "landingController", landingController );
	}
);
