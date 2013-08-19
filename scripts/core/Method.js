define( [
	],
	function() {

		"use strict";

		function Method( parameters ) {
			this.thing      = parameters.thing;
			this.name       = parameters.name;
			this.type       = parameters.type || Method.INSTANCE;
			this.parameters = [];
			this.code       = parameters.code || "";
		}

		Method.prototype.addParameter = function( name ) {
			if( this.parameters.indexOf( name ) === -1 ) {
				this.parameters.push( name );
			}
			return this;
		};
		Method.prototype.removeParameter = function( name ) {
			var index = this.parameters.indexOf( name );
			this.parameters.splice( index, 1 );
		};
		
		Method.prototype.setCode = function( code ) {
			this.code = code;
		};

		Method.prototype.getCode = function() {
			if( this.type === Method.CONSTRUCTOR ) {
				return "\tfunction " + this.thing.name + "( " + this.parameters.join( ", " ) + " ) {\n" + this.code + "\n\t};\n\n";
			} else if( this.type === Method.INSTANCE ) {
				return "\t"+this.thing.name + ".prototype." + this.name + " = function ( " + this.parameters.join( ", " ) + " ) {\n" + this.code + "\n\t}\n\n";
			} else {
				return "\t"+this.thing.name + "." + this.name + " = function ( " + this.parameters.join( ", " ) + " ) {\n" + this.code + "\n\t}\n\n";
			}
		};

		Method.CONSTRUCTOR = "constructor";
		Method.INSTANCE    = "instance";
		Method.STATIC      = "static";

		return Method;
	}
);