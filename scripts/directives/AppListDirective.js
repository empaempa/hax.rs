define( [
	"haxrs",
	"core/App",
	"text!directiveTemplates/appList.html" ],

	function( haxrs, App, template ) {

		"use strict";

		function AppListDirective() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: AppListDirective.controller
			};
		}

		AppListDirective.controller = function ( $scope, $rootScope, $location, firebase, session, safeApply ) {
				
			$scope.addApp = function () {
				if( !$scope.newAppName || !session.isLoggedIn ) {
					return;
				}

				if( !session.user.appExists( $scope.newAppName )) {
					var app = new App( { name: $scope.newAppName, owner: session.user.details.id } );
					app.addMainThing();

					firebase.child( "appCount" ).transaction( function( currentCount ) {
						return currentCount + 1;
					}, function( err, commited, snapshot ) {
						app.id = snapshot.val();
						session.user.addApp( app );

						firebase.child( session.user.path + "apps/" + snapshot.val() + "/" ).set( app.toJSON());

						$location.path( "/editor/" + session.user.details.id + "/" + snapshot.val());
						safeApply( $rootScope );
					});
					
					$scope.newAppName = "";
				} else {
					alert( "An app with that name already exists!" );
				}
			};

			$scope.removeApp = function ( scope ) {
				var app = scope.app;
				var id  = scope.id;

				if( confirm( "Are you sure you want to remove the app '" + app.name + "'?" )) {
					$scope.$emit( "fbRemove", session.user.path + "/apps/" + id + "/", function( error ) {
						if( error ) {
							alert( "Something went wrong when trying to delete the app!" );
						} else {
							session.user.removeApp( id );
						}
						safeApply( $scope );
					});
				}
			};
		};

		haxrs.directive( "applist", AppListDirective );

		return AppListDirective;
	}
);

