define( [
	"core/Thing",
	"core/Locale!"
], function( Thing, Locale ) {

		"use strict";

		function App( config ) {
			config          = config || {};
			this.things     = {};
			this.owner      = config.owner || "anonymous";
			this.id         = config.id    || undefined;
			this.name       = config.name  || "Min app!";
			this.nativeCode = "";
		}

		App.prototype.toJSON = function() {
			return JSON.parse( JSON.stringify( {
				id: 	this.id,
				name: 	this.name,
				owner: 	this.owner,
				things: this.things
			}));
		};

		App.prototype.fromJSON = function( json ) {
			if( json ) {
				if( json.hasOwnProperty( "name" )) {
					this.name = json.name;
				}
				if( json.hasOwnProperty( "id" )) {
					this.id = json.id;
				}
				if( json.hasOwnProperty( "owner" )) {
					this.owner = json.owner;
				}

				this.nativeCode = "";

				// Add/update
				for( var name in json.things ) {
					if( !this.doesThingExist( name )) {
						this.addThing( name );
					}
					this.things[ name ].fromJSON( json.things[ name ] );
				}

				// Remove
				for( var name in this.things ) {
					if( !json.things.hasOwnProperty( name )) {
						this.removeThing( name );
					}
				}
			}

			return this;
		};

		App.prototype.doesThingExist = function( name ) {
			return this.things.hasOwnProperty( name );
		};

		App.prototype.addMainThing = function() {
			this.addThing    ( Locale.translateApp( "main" ))
				.addMethod   ( Locale.translateApp( "update" ))
				.addParameter( Locale.translateApp( "deltaTime" ));
			
			return this;
		};

		App.prototype.getMainThing = function() {
			return this.getThing( Locale.translateApp( "main" ));
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