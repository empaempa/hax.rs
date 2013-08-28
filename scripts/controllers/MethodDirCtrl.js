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

	MethodDirCtrl.controller = function( $scope, $element, $timeout ) {

		var method        = $scope.method;
		var editorElement = $element.find( ".cm" )[ 0 ];

		var editor = CodeMirror( editorElement, {
			mode:   "javascript",
			indent: true,
			matchBrackets: true,
			indentWithTabs: true
		} );

		method.editor = editor;
		method.element = $element;

		var firepad = Firepad.fromCodeMirror($scope.firebase.ref.child("users/"+($scope.session.user? $scope.session.user.id : "anonymous")+"/apps/"+$scope.app.name+"/things/"+method.thing.name+"/methods/"+method.name+"/pad"), editor);
		firepad.on('ready', function () {

			//if (firepad.isHistoryEmpty()) {
				//firepad.setText(method.code || "");
			//}
			
			/*method.hideable = false;
			$scope.safeApply();
			editor.refresh();
			method.hideable = true;*/
			
		});
		method.firepad = firepad;

		$scope.removeMethod = function () {
			var method = $scope.method;
			//var pos = $scope.things.indexOf(thing);
			$scope.thing.removeMethod(method.name);
			$scope.$emit("fbRemove", "/things/"+method.thing.name+"/methods/"+method.name);
			//$scope.thing = $scope.things[Math.min(pos, $scope.things.length-1)];
		};

	};

	haxrs.directive("method", MethodDirCtrl);
});