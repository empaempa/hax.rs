define([
	"haxrs",
	"json!config",
	"core/User" ],

	function( haxrs, config, User ) {
	
		"use strict";

		haxrs.factory( "session", function( $location, $rootScope, angularFireAuth, firebase, safeApply ) {

			// public

			var session = {
				user: 			undefined,
				isLoggingIn: 	true,
				isLoggedIn: 	false,

				signUp: function( name, email, password ) {
					session.isLoggingIn = true;

					angularFireAuth.createUser( email, password, function( firebaseUser ) {
						if( firebaseUser ) {
							session.user = new User();
							session.user.setDetails( {
								id: 	firebaseUser.id,
								email: 	firebaseUser.email,
								name: 	name
							});

							session.login( email, password );
						}
					} );
				},

				login: function( email, password ) {
					session.isLoggingIn = true;
					angularFireAuth.login( "password", { email: email, password: password } );
				},

				logout: function( $scope ) {
					session.isLoggingIn = false;
					angularFireAuth.logout();

					$location.path("/login");
				}
			};

			// init session

			$rootScope.session = session;

			angularFireAuth.initialize( config.firebase, { callback: function( error, firebaseUser ) {
				if( error ) {
					console.log( "Error: ", error );
					return;
				}

				if( firebaseUser ) {
					session.isLoggingIn = true;

					if( session.user ) {
						firebase.child( session.user.path ).set( session.user.asJSON(), function( error ) {
							session.isLoggingIn = false;
							session.isLoggedIn  = true;
							
							$location.path( "/dashboard" );
							safeApply( $rootScope );
						} );
					} else {
						session.user = new User();
						session.user.setDetails( {
							id: 	firebaseUser.id,
							email: 	firebaseUser.email
						});

						// maybe here we should setup the user sync process?
						firebase.child( session.user.path ).once( "value", function( snapshot ) {
							session.user.fromJSON( snapshot.val());

							session.isLoggingIn = false;
							session.isLoggedIn  = true;
	
							if( $location.path() === "/login" ) {
								$location.path( "/dashboard" );
							}

							safeApply( $rootScope );
						});
					}
				} else {
					session.user        = undefined;
					session.isLoggingIn = false;
					session.isLoggedIn  = false;

					$location.path( "/login" );
					
				}
				
				safeApply( $rootScope );
			} } );

			return session;
		});
	}
);