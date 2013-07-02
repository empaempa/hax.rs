define( [
	"app/Thing",
	"editor/Compiler" ],
	function( Thing, Compiler ) {

		"use strict";

		function App() {
			this.things = {};
			this.runable = function() {};
			this.addMainThing();
		}

		App.prototype.doesThingExists = function( name ) {
			return this.things[ name ] !== undefined;
		};

		App.prototype.addMainThing = function( ) {
			this.addThing( "Main" ).addMethod( "update" ).addParameter( "deltaTime" );
		};

		App.prototype.addThing = function( name ) {
			if( this.doesThingExists( name )) {
				console.error( "App.addThing: Thing " + name + " already exists, not adding" );
				return;
			}

			return this.things[ name ] = new Thing( { name: name } );
		};

		App.prototype.compile = function() {
			Compiler.process( this );
		};

		App.prototype.setRunable = function( runable ) {
			this.runable = runable;
		};

		App.prototype.getRunable = function() {
			return this.runable();
		};

		return App;
	}
);