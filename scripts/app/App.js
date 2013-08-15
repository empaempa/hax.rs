define( [
	"app/Thing",
	"editor/Compiler",
	"tools/Draw" ],
	function( Thing, Compiler, Draw ) {

		"use strict";

		function App() {
			this.things = {};
			this.thingsAsArray = [];
			this.nativeCode = "";
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
			var thing = new Thing( { name: name } );
			this.things[ name ] = thing;
			this.thingsAsArray.push( thing );
			return thing;
		};

		App.prototype.getThing = function( name ) {
			if( !this.doesThingExists( name )) {
				console.error( "App.getThing: no " + name + " available" );
				return;
			}

			return this.things[ name ];
		};

		App.prototype.compile = function() {
			Compiler.process( this );
		};

		App.prototype.setRunable = function( runable ) {
			this.runable = runable;
		};

		App.prototype.getRunable = function() {
			return this.runable;
		};
		
		App.prototype.run = function() {
			var toolchain = [new Draw()];

			return new this.runable(toolchain[0]);
		};

		return App;
	}
);