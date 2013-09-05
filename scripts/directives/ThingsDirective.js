define([
	"jquery",
	"haxrs",
	"text!directiveTemplates/things.html" ],
	function( $, haxrs, template ) {
		
		"use strict";

		function ThingsDirective() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: ThingsDirective.controller
			};
		}

		ThingsDirective.controller = function ( $scope, $rootScope, $element, session, i18n, safeApply ) {

			$scope.addThing = function() {
				var thing = $scope.app.addThing( $scope.newThingName );
				if( thing ) {
					$scope.newThingName = "";
					$scope.$emit( "fbSet", session.user.currentAppPath + "things/" + thing.name, JSON.parse( JSON.stringify( thing )));
				} else {
					alert( i18n( "editor.ThingAlreadyExists" ));
				}
			};

			$scope.showThing = function( thing ) {
				$scope.showSingleMethod = false;
				$scope.thing            = thing;
				$scope.method           = undefined;		// in this case, method is injected into scope by a ng-repeat
				safeApply( $rootScope );
			}

			$scope.showMethod = function( method ) {
				$scope.showSingleMethod = true;
				$scope.thing            = method.thing;
				$scope.method           = method;
				safeApply( $rootScope );
			}

			$scope.addMethod = function( scope ) {
				var method = scope.thing.addMethod( scope.newMethodName );
				if( method ) {
					scope.newMethodName = "";
					$scope.$emit( "fbSet", session.user.currentAppPath + "things/" + method.thing.name + "/methods/" + method.name, JSON.parse( JSON.stringify( method )));
				} else {
					alert( "editor.MethodAlreadyExists" );
				}
			}
		};

		haxrs.directive( "things", ThingsDirective );

		return ThingsDirective;
	}
);

