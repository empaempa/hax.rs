define( [
	"core/Thing" ],
	function( Thing ) {

		"use strict";

		function App() {
			this.things = {};
			//this.thingsAsArray = [];
			this.nativeCode = "";
			this.addMainThing();
		}

		App.prototype.doesThingExists = function( name ) {
			return this.things[ name ] !== undefined;
		};

		App.prototype.addMainThing = function( ) {
			this.addThing( "Main" ).addMethod( "update" ).addParameter( "deltaTime" );
		};

		App.prototype.addThing = function( name ) {
			if (typeof name !== "string" || name.length ===0) {
				console.error("App.addThing: Invalid name");
				return;
			}
			if( this.doesThingExists( name )) {
				console.error( "App.addThing: Thing " + name + " already exists, not adding" );
				return;
			}
			var thing = new Thing( { name: name } );
			this.things[ name ] = thing;
			//this.thingsAsArray.push( thing );
			return thing;
		};

		App.prototype.getThing = function( name ) {
			if( !this.doesThingExists( name )) {
				console.error( "App.getThing: no " + name + " available" );
				return;
			}

			return this.things[ name ];
		};

		App.prototype.removeThing = function( name ) {
			if( !this.doesThingExists( name )) {
				console.error( "App.removeThing: no " + name + " available" );
				return;
			}
			var thing = this.things[name];
			//this.thingsAsArray.splice(this.thingsAsArray.indexOf(thing), 1);
			delete this.things[name];
		};
		App.prototype.renameThing = function( name, newName ) {
			if( !this.doesThingExists( name )) {
				console.error( "App.renameThing: no " + name + " available" );
				return;
			}
			var thing = this.things[name];
			this.things[newName] = thing;
			delete this.things[name];
		};

		return App;
	}
);