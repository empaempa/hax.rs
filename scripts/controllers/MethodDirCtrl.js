define( [ 
	"jquery",
	"angular",
	"text!directives/methodDir.html" ],
	function( $, angular, template ) {
		"use strict";

		function MethodDirCtrl() {
			var directiveDefinitionObject = {
				template: template,
				restrict: 'E',
				controller: MethodDirCtrl.controller
			};
			
			return directiveDefinitionObject;
		}

		MethodDirCtrl.controller = function( $scope, $element ) {

			var method        = $scope.method;
			var editorElement = $element.find( ".cm" )[ 0 ];
			
			var editor = CodeMirror( editorElement, {
				value:  method.code,
				mode:   "javascript",
				indent: true,
				lineNumbers: true,
				matchBrackets: true,
				indentWithTabs: true
			} );

			editor.on( "change", function() {
				method.code = editor.getValue();
			} );
		};

		return MethodDirCtrl;
	}
);