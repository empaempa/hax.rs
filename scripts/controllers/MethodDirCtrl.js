define([ 
	"haxrs",

	"text!directives/methodDir.html"
], function( haxrs, template ) {
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
			$scope.$emit("fbSet", "/things/"+method.thing.name+"/methods/"+method.name+"/code", method.code);
		} );

		method.editor = editor;

		$scope.removeMethod = function () {
			var method = $scope.method;
			//var pos = $scope.things.indexOf(thing);
			$scope.thing.removeMethod(method.name);
			$scope.$emit("fbRemove", "/things/"+method.thing.name+"/methods/"+method.name);
			//$scope.thing = $scope.things[Math.min(pos, $scope.things.length-1)];
		};

	};

	haxrs.directive("methodEditor", MethodDirCtrl);
});