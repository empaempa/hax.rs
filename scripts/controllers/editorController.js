define( [ 
	"haxrs",
	"json!config",
	"core/Locale!",
	"core/App" ],

	function( haxrs, config, Locale, App ) {

		"use strict";

		function editorController( $scope, $rootScope, $routeParams, firebase, session, safeApply ) {
			
			var id = $routeParams.appID;

			if( session.user && session.user.appExists( id )) {
				$scope.app   = session.user.getApp( id );
				$scope.thing = $scope.app.getMainThing();

				startSync();
				safeApply( $scope );
			} else {
				var removeWatch = $rootScope.$watch( "session.user.apps." + id, function( newValue, oldValue ) {
					if( newValue !== undefined ) {
						removeWatch();
						
						$scope.app   = session.user.getApp( id );
						$scope.thing = $scope.app.getMainThing();

						startSync();
						safeApply( $scope );
					}
				});
			}
		
			function startSync() {
				firebase.child( session.user.currentAppPath ).on( "value", sync );
			}

			function stopSync() {
				firebase.child( session.user.currentAppPath ).off( "value", sync );
			}

			function sync( snapshot ) {
				$scope.app.fromJSON( snapshot.val());
				safeApply( $scope );
			}
		};

		haxrs.controller( "editorController", editorController );
	}
);
