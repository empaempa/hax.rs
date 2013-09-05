define([ 
	"haxrs",
	"text!directiveTemplates/topbar.html" ],

	function( haxrs, template ) {
	
		"use strict";

		function TopBarDirective() {
			var directiveDefinitionObject = {
				template: 	template,
				restrict:   "E",
				controller: TopBarDirective.controller
			};

			return directiveDefinitionObject;
		}

		TopBarDirective.controller = function( $scope, $element, $location, session ) {

			$scope.selectApp = "";

			$scope.gotoLogin = function() {
				$location.path( "login" );
			};

			$scope.gotoSignUp = function() {
				$location.path( "signup" );
			};

			$scope.gotoHome = function() {
				$location.path( "" );
			}

			$scope.logoutUser = function () {
				session.logout($scope);
			};

			$scope.changeApp = function (scope) {
				if (scope.selectApp) {
					$location.path("/editor/"+$scope.session.user.id+"/"+scope.selectApp);
				}
			};
		};

		haxrs.directive( "topbar", TopBarDirective );

		return TopBarDirective;
	}
);
