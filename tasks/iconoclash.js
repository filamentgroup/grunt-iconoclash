/*
 * iconoclash grunt task
 * https://github.com/filamentgroup/grunt-iconoclash
 *
 * Copyright (c) 2020 Scott Jehl, Filament Group, Inc
 * Licensed under the MIT license.
 */

/*global require:true*/
var Iconoclash = require( 'fg-iconoclash' );

module.exports = function( grunt , undefined ) {
	"use strict";

	grunt.registerMultiTask( 'iconoclash', 'Easy external SVGs', function() {
		var done = this.async();

		// get the config
		var config = this.options({
			logger: {
				verbose: grunt.verbose.writeln,
				fatal: grunt.fatal,
				ok: grunt.log.ok
			}
		});

		// just a quick starting message
		grunt.verbose.writeln( "Grunt iconoclash!" );

		var files = this.files.filter( function( file ){
			return file.src[0].match( /svg/ );
		});

		if( files.length === 0 ){
			grunt.log.writeln( "Iconoclash has no files to read!" );
			done();
			return;
		}

		files = files.map( function( file ){
			return file.src[0];
		});

		var output = this.files[0].orig.dest;

		if( !output || output && output === "" ){
			grunt.fatal("The destination must be a directory");
			done( false );
		}

		var iconoclash = new Iconoclash(files, output, config);

		iconoclash.process( done );
	});
};
