define( [
	"core/Method" ],
	function( Method ) {

		"use strict";

		function Thing( parameters ) {
			this.name       = parameters.name;
			this.methods    = {};
			this.nativeCode = "";
			this.app        = parameters.app;

			this.addConstructor();
		}
		Thing.prototype.toJSON = function() {
			return {
				name: this.name,
				methods: this.methods
			};
		};

		Thing.prototype.fromJSON = function(json) {
			
			//console.log(json);

			if (json.hasOwnProperty("name")) {
				this.name = json.name;
			}

			this.nativeCode = "";

			// Remove
			for (var name in this.methods) {
				if (!json.methods.hasOwnProperty(name)) {
					this.removeMethod(name);
				}
			}

			// Add/update
			for (var name in json.methods) {
				if (!this.doesMethodExist(name)) {
					var m = json.methods[name];
					if (m.type === Method.STATIC) {
						this.addStaticMethod(name);
					} else if (m.type === Method.CONSTRUCTOR && name === "construct") {
						this.addConstructor();
					} else {
						this.addMethod(name);
					}
				}
				json.methods[name].thing = this;
				json.methods[name].name = name;
				this.methods[name].fromJSON(json.methods[name]);
			}
		};

		Thing.prototype.doesMethodExist = function( name ) {
			return this.methods.hasOwnProperty( name );
		};

		Thing.prototype.addConstructor = function() {
			if( this.doesMethodExist( "construct" )) {
				console.error( "Thing.addConstructor: construct already exists, not adding!" );
			}

			return this.methods[ "construct" ] = new Method( { app: this.app, thing: this, type: Method.CONSTRUCTOR, name: "construct", code: "this.name = 'I am " + this.name + "!'; console.log( this.name );" } );
		};

		Thing.prototype.addMethod = function( name ) {
			if( typeof name !== "string" || name.length === 0 ) {
				console.error( "Thing.addMethod: Invalid name!" );
				return;
			}
			if( this.methods[ name ] !== undefined ) {
				console.error( "Thing.addMethod: Method " + name + " already exists, not adding!" );
				return;
			}
			if ( name === "construct") {
				return this.addConstructor();
			}
			this.methods[ name ] = new Method( { app: this.app, thing: this, type: Method.INSTANCE, name: name } );
			return this.methods[ name ];
		};

		Thing.prototype.addStaticMethod = function( name ) {
			if( typeof name !== "string" || name.length === 0 ) {
				console.error( "Thing.addStaticMethod: Invalid name!" );
				return;
			}
			if( this.methods[ name ] !== undefined ) {
				console.error( "Thing.addStaticMethod: Method " + name + " already exists, not adding!" );
				return;
			}

			this.methods[ name ] = new Method( { app: this.app, thing: this, type: Method.STATIC, name: name } );
		};

		Thing.prototype.getMethod = function( name ) {
			if( !this.doesMethodExist( name )) {
				console.error( "Thing.getMethod: " + name + " isn't a method of " + this.name );
			}

			return this.methods[ name ];
		};
		Thing.prototype.removeMethod = function( name ) {
			if( !this.doesMethodExist( name )) {
				console.error( "App.removeMethod: no " + name + " available" );
				return;
			}
			delete this.methods[ name ];
		};

		Thing.prototype.getCode = function() {
			var code = this.methods[ "construct" ].getCode();
			for( var method in this.methods ) {
				if( method !== "construct" ) {
					code += this.methods[ method ].getCode();
				}
			}

			return code;
		};

		Thing.prototype.setNativeCode = function( code ) {
			this.nativeCode = code;
		};

		Thing.prototype.getNativeCode = function() {
			return this.nativeCode;
		};

		return Thing;
	}
);



