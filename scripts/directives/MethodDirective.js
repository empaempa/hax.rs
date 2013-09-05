define( [ 
	"haxrs",
	"text!directiveTemplates/method.html" ],

	function( haxrs, template ) {
	
		"use strict";

		function MethodDirective() {
			return {
				template: 	template,
				restrict: 	"E",
				controller: MethodDirective.controller
			};
		}

		MethodDirective.controller = function( $scope, $element, firebase, session, safeApply ) {

			var method;
			var editorElement;
			var firepad;

			setupEditor();

			function setupEditor() {
				if( method !== $scope.method ) {
					method =   $scope.method;

					if( editorElement ) {
						editorElement.remove();
					}

					editorElement = $element.find( ".cm" )[ 0 ];

					console.log( "Setting up for " + method.name );

					method.editor = CodeMirror( editorElement, {
						mode:   		"javascript",
						indent: 		true,
						matchBrackets: 	true,
						indentWithTabs: true
					} );

					if( firepad ) {
						firepad.dispose();
					}

					firepad = Firepad.fromCodeMirror( firebase.child( session.user.currentAppPath + "things/" + method.thing.name + "/methods/" + method.name + "/pad" ), method.editor );
				}
			}

			$scope.$watch( "method", function( newValue, oldValue ) {
				if( newValue && newValue !== oldValue ) {
					setupEditor();
				}
			});

			$scope.$on( "$destroy", function() {
				firepad.dispose();
        	});

			$scope.removeMethod = function () {
				$scope.thing.removeMethod( $scope.method.name );
				$scope.$emit( "fbRemove", "/things/" + method.thing.name + "/methods/" + method.name );
			};
		};

		haxrs.directive( "method", MethodDirective );

		return MethodDirective;
	}
);