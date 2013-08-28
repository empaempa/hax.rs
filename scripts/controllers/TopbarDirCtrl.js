define([ 
	"haxrs",
	
	"text!directives/topbarDir.html"
], function( haxrs, template ) {
	"use strict";

	function TopbarDirCtrl() {
		var directiveDefinitionObject = {
			template: template,
			restrict: 'E',
			controller: TopbarDirCtrl.controller
		};

		return directiveDefinitionObject;
	}

	TopbarDirCtrl.controller = function( $scope, $element, $location, session ) {

		$scope.selectApp = "";

		$scope.login = function() {
			$location.path( "login" );
		};

		$scope.signup = function() {
			$location.path( "signup" );
		};

		$scope.home = function() {
			$location.path( "" );
		}

		$scope.loginUser = function () {
			session.login($scope, $scope.loginForm);
		};

		$scope.logoutUser = function () {
			session.logout($scope);
		};

		$scope.addUser = function () {
			session.createUser($scope, $scope.registerForm);
		};

		$scope.changeApp = function (scope) {

			if (scope.selectApp) {
				$location.path("/editor/"+$scope.session.user.id+"/"+scope.selectApp);
			}
			//scope.selectApp = "";
		};

		$scope.initSelectApp = function (scope) {
			
		};
	};

	haxrs.directive("topbar", TopbarDirCtrl);
});
