define( [
	"core/Thing",
	"signals" ],
	function( Thing, signals ) {

		"use strict";

		function App() {
			this.things = {};
			this.name = "MyFirstApp";
			
			this.nativeCode = "";
			//this.onChange = new signals.Signal();
			this.addMainThing();
		}

		App.prototype.toJSON = function() {
			return {
				name: this.name,
				things: this.things
			};
		};

		App.prototype.fromJSON = function(json) {

			if (!json) {
				return;
			}

			if (json.hasOwnProperty("name")) {
				this.name = json.name;
			}
			if (json.hasOwnProperty("id")) {
				this.id = json.id;
			}

			this.nativeCode = "";

			// Add/update
			for (var name in json.things) {
				if (!this.doesThingExist(name)) {
					this.addThing(name);
				}
				this.things[name].fromJSON(json.things[name]);
			}

			// Remove
			for (var name in this.things) {
				if (!json.things.hasOwnProperty(name)) {
					this.removeThing(name);
				}
			}
		};

		App.prototype.doesThingExist = function( name ) {
			return this.things.hasOwnProperty( name );
		};

		App.prototype.addMainThing = function( ) {
			this.addThing( "Main" ).addMethod( "update" ).addParameter( "deltaTime" );
		};

		App.prototype.addThing = function( name ) {
			if (typeof name !== "string" || name.length ===0) {
				console.error("App.addThing: Invalid name");
				return;
			}
			if( this.doesThingExist( name )) {
				console.error( "App.addThing: Thing " + name + " already exists, not adding" );
				return;
			}
			var thing = new Thing( { name: name, app: this } );
			this.things[ name ] = thing;
			//this.thingsAsArray.push( thing );
			return thing;
		};

		App.prototype.getThing = function( name ) {
			if( !this.doesThingExist( name )) {
				console.error( "App.getThing: no " + name + " available" );
				return;
			}

			return this.things[ name ];
		};

		App.prototype.removeThing = function( name ) {
			if( !this.doesThingExist( name )) {
				console.error( "App.removeThing: no " + name + " available" );
				return;
			}
			var thing = this.things[name];
			//this.thingsAsArray.splice(this.thingsAsArray.indexOf(thing), 1);
			delete this.things[name];
		};
		App.prototype.renameThing = function( name, newName ) {
			if( !this.doesThingExist( name )) {
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