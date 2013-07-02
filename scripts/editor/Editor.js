define( [
	"app/Method",
	"app/Thing",
	"editor/Compiler" ],
	function( Method, Thing, Compiler ) {

		"use strict";

		function Editor() {
		}

		Editor.prototype.showThing = function( name ) {
			if( this.things[ name ] === undefined ) {
				console.error( "Editor.showThing: " + name + " doesn't exists" );
				return;
			}

			this.clearAllMethods();
			var thing = things[ name ];

			for( var method in thing.methods ) {
				this.addMethod( thing.methods[ method ] );
			}
		};

		Editor.prototype.clearAllMethods = function() {
		};

		Editor.prototype.addMethod = function( thing, method ) {
			if( method.type === Method.INSTANCE ) {
				// add to instance
			} else {
				// add to static
			}
		};

		return Editor;
	}
);