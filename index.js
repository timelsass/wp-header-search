const fs = require( 'fs' ).promises,
	header = require( 'wp-project-header' );

/**
 * Finds key in a WordPress theme or plugin header file.
 *
 * @param {String} key Key to search for, like Version:, Text Domain:, ect.
 * @param {String} file Content to search.
 */
module.exports = async ( key, file ) => {
	file = await header( file );

	let content = await fs.readFile( file, 'utf8' );
	content = content.replace( /\r/g, '\n' );

	let regex = new RegExp( `^[ \t\/*#@]*${ key }*?:(.*)$`, 'mi' ),
		match = regex.exec( content );

	return match[1].replace( /\s*(?:\*\/|\?>).*/, '' ).trim();
};
