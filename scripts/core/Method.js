define( [
	],
	function() {

		"use strict";

		function Method( parameters ) {
			this.app        = parameters.app;
			this.thing      = parameters.thing;
			this.name       = parameters.name;
			this.type       = parameters.type || Method.INSTANCE;
			this.parameters = [];
			this.code       = parameters.code || "";
			this.editor = null;
		}
		Method.prototype.toJSON = function () {
			return {
				name: this.name,
				type: this.type,
				parameters: this.parameters,
				code: this.code
			};
		};

		Method.prototype.fromJSON = function( json ) {

			
			this.thing = json.thing;
			this.name = json.name;
			this.type = json.type;
			this.setCode( json.code );


			this.parameters.length = 0;
			if (Array.isArray(json.parameters)) {
				for (var i = 0; i < json.parameters.length; i++) {
					this.parameters.push(json.parameters[i]);
				}
			}
		};

		Method.prototype.doesParameterExist = function( name ) {
			return this.parameters.indexOf( name ) !== -1;
		};

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
			if (this.code !== code) {
				this.code = code;

				if (this.editor) {
					this.editor.setValue(this.code);
				}
			}
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