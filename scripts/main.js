require( [ 
	"editor/Editor",
	"player/Player",
	"app/App" ],
	function( Editor, Player, App ) {

		var editor = CodeMirror( document.getElementById( "code" ), {
			value: "var a = 1",
			mode:  "javascript",
			indent: true
		} );


		var app = new App();
		app.compile();

		var rita = {
			hello: function() { console.log( "hello" ); }
		}

		new app.runable( rita );
	}
);