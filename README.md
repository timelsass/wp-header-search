# wp-header-search
Easily find a value for a supplied key in a theme and plugin header files.

This can be useful during builds for doing things like linting version increments,comparing the WP Tested Up To version, checking theme textdomains, and more!

## Install

Install with yarn:

```
$ yarn add wp-header-search --dev
```

-- OR --

Install with npm:

```
$ npm install wp-header-search --save-dev
```

## Usage

```js
const searchHeader = require( 'wp-header-search' );

( async () => {
	/* Ran in module inside a plugin */
	console.log( await searchHeader( 'Version' ) );
	//=> '1.3.0-rc.1'

	/* Ran in module inside a theme */
	console.log( await searchHeader( 'GNU General Public License v2 or later' ) );
	//=> '1.7.0'

	/* Capture any header name's value you need! */
	console.log( await searchHeader( 'License' ) );
	//=> 'GNU General Public License v2 or later'
} )();
```

Internally this uses [wp-project-header](https://github.com/timelsass/wp-project-header) to automatically determine if it's running inside of a theme or plugin, so you don't have to worry about passing the file path in.

Sometimes you might need to override that setting though, so a second parameter for the path to a header file is available.  For example getting a parent theme's version from style.css:

```js
const searchHeader = require( 'wp-header-search' ),
	path = require( 'path' );

( async () => {
	console.log( await searchHeader( 'Version', path.resolve( '../../themes/parent-theme/style.css' ) ) );
	//=> '2.1.1'
} )().catch( console.error );
```
