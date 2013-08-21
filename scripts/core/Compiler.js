define( [
	"json!config",
	"core/Locale!",
	"tools/Tool"
],
	function( config, Locale, Tool ) {
		"use strict";

		var Compiler = {};

		Compiler.build = function( app ) {
			this.translate( app );
			this.lint( app );
			return this.assemble( app );
		};

		Compiler.translate = function( app ) {
			for( var thingName in app.things ) {
				var thing = app.things[ thingName ];
				thing.setNativeCode( doTranslate( thing.getCode()));
			}
		};

		Compiler.lint = function( app ) {

		};

		Compiler.assemble = function( app ) {
			var nativeCode;
			var tools = config.tools;

			var toolDeclaration = "";
			var toolParameters = "";
			var toolAssignment = "";
			for (var i = 0; i < tools.length; i++) {
				if (i === 0) {
					toolDeclaration += "var ";
				}
				var translated = Locale.translateTool(tools[i]).toLowerCase();
				toolDeclaration += translated;
				toolParameters += "$"+tools[i].toLowerCase();
				toolAssignment += translated+" = $"+tools[i].toLowerCase()+";\n\t\t";
				if (i+1 !== tools.length) {
					toolDeclaration += ", ";
					toolParameters += ", ";
				} else {
					toolDeclaration += ";\n\t";
				}
			}

			nativeCode  =
				"(function () {\n\t"+
					"'use strict';\n\t"+
					""+toolDeclaration+"\n\t"+
					"function App( "+toolParameters+" ) {\n\t\t"+
						""+toolAssignment+"\n\t\t"+
						"this.main = new Main();\n\t\t"+
						"this.paused = false;\n\t\t"+
						"this.raf = null;\n\t\t"+
					"}\n\t"+
			//		"App.prototype.update = function() {\n\t\t"+
			//			"this.main.update();\n\t\t"+
			//			"requestAnimationFrame( this.update.bind( this ) );\n\t"+
			//		"};\n\t"+
					"\n";

			for( var thing in app.things ) {
				nativeCode += app.things[ thing ].getNativeCode();
			}

			nativeCode +=
					"\treturn App;\n"+
				"}());";
			app.nativeCode = nativeCode;

			try {
				var runable = eval( nativeCode );
			} catch (e) {
				alert(e.stack.split("\n")[0]);
			}
			
			return runable;
		};

		// private

		function doTranslate( code ) {
			var wordsToTranslate = code.replace( /[\(\)\n\t\;\.\,\%\&\'\"\?\:\!\{\}\=\+\-\*\/0-9]/g, " " ).split( " " ).filter( function( s ) { return s !== "" } );
			var translatedWords  = [];
			
			var w = wordsToTranslate.length
			while( w-- ) {
				translatedWords[ w ] = Locale.translate( wordsToTranslate[ w ].trim());
			}

			var nativeCode = "";
			var lastIndex = 0, lastWordLength = 0, currentIndex = 0;

			for( w = 0; w < translatedWords.length; w++ ) {
				lastIndex    = currentIndex;
				currentIndex = code.indexOf( wordsToTranslate[ w ], currentIndex );

				nativeCode += code.slice( lastIndex, currentIndex );
				nativeCode += translatedWords[ w ];

				lastWordLength = wordsToTranslate[ w ].length;
				currentIndex  += lastWordLength;
			}

			nativeCode += code.slice( currentIndex );

			return nativeCode;
		};

		// shared
		// this need a proper lexer 

		var reservedWords = {
			"abstract":true,
			"boolean":true,
			"break":true,
			"byte":true,
			"case":true,
			"catch":true,
			"char":true,
			"class":true,
			"const":true,
			"continue":true,
			"debugger":true,
			"default":true,
			"delete":true,
			"do":true,
			"double":true,
			"else":true,
			"enum":true,
			"export":true,
			"extends":true,
			"false":true,
			"final":true,
			"finally":true,
			"float":true,
			"for":true,
			"function":true,
			"goto":true,
			"if":true,
			"implements":true,
			"import":true,
			"in":true,
			"instanceof":true,
			"int":true,
			"interface":true,
			"let":true,
			"long":true,
			"native":true,
			"new":true,
			"null":true,
			"package":true,
			"private":true,
			"protected":true,
			"public":true,
			"return":true,
			"short":true,
			"static":true,
			"super":true,
			"switch":true,
			"synchronized":true,
			"this":true,
			"throw":true,
			"throws":true,
			"transient":true,
			"true,":true,
			"try":true,
			"typeof":true,
			"var":true,
			"void":true,
			"volatile":true,
			"while":true,
			"with":true,
			"alert":true,
			"all":true,
			"anchor":true,
			"anchors":true,
			"area":true,
			"Array":true,
			"assign":true,
			"blur":true,
			"button":true,
			"checkbox":true,
			"clearInterval":true,
			"clearTimeout":true,
			"clientInformation":true,
			"close":true,
			"closed":true,
			"confirm":true,
			"constructor":true,
			"crypto":true,
			"Date":true,
			"decodeURI":true,
			"decodeURIComponent":true,
			"defaultStatus":true,
			"document":true,
			"element":true,
			"elements":true,
			"embed":true,
			"embeds":true,
			"encodeURI":true,
			"encodeURIComponent":true,
			"escape":true,
			"eval":true,
			"event":true,
			"fileUpload":true,
			"focus":true,
			"form":true,
			"forms":true,
			"frame":true,
			"frames":true,
			"frameRate":true,
			"getClass":true,
			"hasOwnProperty":true,
			"hidden":true,
			"history":true,
			"image":true,
			"images":true,
			"Infinity":true,
			"isFinite":true,
			"isNaN":true,
			"isPrototypeOf":true,
			"java":true,
			"JavaArray":true,
			"JavaClass":true,
			"JavaObject":true,
			"JavaPackage":true,
			"innerHeight":true,
			"innerWidth":true,
			"layer":true,
			"layers":true,
			"length":true,
			"link":true,
			"location":true,
			"Math":true,
			"mimeTypes":true,
			"name":true,
			"NaN":true,
			"navigate":true,
			"navigator":true,
			"Number":true,
			"Object":true,
			"offscreenBuffering":true,
			"open":true,
			"opener":true,
			"option":true,
			"outerHeight":true,
			"outerWidth":true,
			"packages":true,
			"pageXOffset":true,
			"pageYOffset":true,
			"parent":true,
			"parseFloat":true,
			"parseInt":true,
			"password":true,
			"pkcs11":true,
			"plugin":true,
			"prompt":true,
			"propertyIsEnum":true,
			"prototype":true,
			"radio":true,
			"reset":true,
			"screenX":true,
			"screenY":true,
			"scroll":true,
			"secure":true,
			"select":true,
			"self":true,
			"setInterval":true,
			"setTimeout":true,
			"status":true,
			"String":true,
			"submit":true,
			"taint":true,
			"text":true,
			"textarea":true,
			"top":true,
			"toString":true,
			"undefined":true,
			"unescape":true,
			"untaint":true,
			"valueOf":true,
			"window":true,	
		};

		return Compiler;
	}
);