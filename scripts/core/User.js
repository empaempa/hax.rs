define( [ 
	"core/App" ],

	function( App ) {
		
		"use strict";

		// internal classes

		function UserDetails() {
			this.id    = "";
			this.name  = "";
			this.email = "";
			this.image = "";
			this.cred  = 0;
		}

		// public class

		function User() {
			this.details = new UserDetails();
			this.apps    = {};
			this.path    = "";
		}

		User.prototype.setDetails = function( details ) {
			for( var key in details ) {
				this.details[ key ] = details[ key ];
			}

			this.path = "users/" + this.details.id + "/";
		};

		User.prototype.appExists = function( nameOrID ) {
			for( var id in this.apps ) {
				if( id === nameOrID ) {
					return true;
				}
				if( this.apps[ id ].name === nameOrID ) {
					return true;
				}
			}

			return false;
		};

		User.prototype.createApp = function( id, name ) {
			this.apps[ id ] = new App( { id: id, name: name, owner: this.details.id } ).addMainThing();
			return this.apps[ id ];
		};

		User.prototype.addApp = function( app ) {
			if( this.apps[ app.id ] === undefined ) {
				this.apps[ app.id ] = app;
			}
			return app;
		};

		User.prototype.removeApp = function( id ) {
			delete this.apps[ id ];
		};

		User.prototype.getApp = function( id ) {
			if( this.apps[ id ] !== undefined ) {
				this.currentAppPath = this.path + "apps/" + id + "/";
				return this.apps[ id ];
			} else {
				console.warn( "User.getApp: Trying to get app with ID " + id + " but it's not here" );
			}
		};

		User.prototype.setApps = function( apps ) {
			for( var id in apps ) {
				this.addApp( new App( { id: id, name: apps[ id ].name, owner: this.details.id } ).fromJSON( apps[ id ] ));
			}
		};

		User.prototype.asJSON = function() {
			var appsAsJSON = {};
			for( var app in this.apps ) {
				appsAsJSON[ app ] = this.apps[ app ].asJSON();
			}

			return {
				details: this.details,
				apps: 	 appsAsJSON
			};
		};

		User.prototype.fromJSON = function( json ) {
			this.setDetails( json.details );
			this.setApps   ( json.apps );
		};

		return User;
	}
);
