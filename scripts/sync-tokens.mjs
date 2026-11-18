/**
 * Copies the component library's design tokens into tokens/, or checks that the copy is current.
 *
 *   npm run sync:tokens     copy tokens.json and elements.json from the library
 *   npm run check:tokens    fail if either copy differs from the library's
 *
 * The library (@ucf/components) is the single source of the brand's values. This theme never
 * edits tokens/ by hand: a change goes into the library first and is synced here, which is
 * the same arrangement the UCF block theme uses.
 *
 * The library is found at UCF_COMPONENTS_PATH, or beside this repository's parent folder at
 * ../nodeProjects/ucf-react-component-library.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '..' );
const library = path.resolve(
	root,
	process.env.UCF_COMPONENTS_PATH ?? '../nodeProjects/ucf-react-component-library'
);
const FILES = [ 'tokens.json', 'elements.json' ];
const check = process.argv.includes( '--check' );

if ( ! existsSync( path.join( library, 'tokens', 'tokens.json' ) ) ) {
	const message = `Component library not found at ${ library }. Set UCF_COMPONENTS_PATH.`;
	if ( check ) {
		// WHY not a failure: a checkout without the library beside it can still build and test
		// the theme from the committed copy. Say plainly that nothing was compared.
		console.warn( `check:tokens skipped. ${ message }` );
		process.exit( 0 );
	}
	console.error( message );
	process.exit( 1 );
}

let stale = 0;
for ( const file of FILES ) {
	const source = readFileSync( path.join( library, 'tokens', file ), 'utf8' );
	const target = path.join( root, 'tokens', file );
	const current = existsSync( target ) ? readFileSync( target, 'utf8' ) : null;

	if ( current === source ) {
		console.log( `tokens/${ file } is current.` );
	} else if ( check ) {
		console.error( `tokens/${ file } differs from the library's. Run npm run sync:tokens.` );
		stale++;
	} else {
		writeFileSync( target, source );
		console.log( `tokens/${ file } updated from ${ library }.` );
	}
}

process.exit( stale ? 1 : 0 );
