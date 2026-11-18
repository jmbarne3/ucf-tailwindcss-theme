/**
 * Runs axe-core (WCAG 2.1 A and AA) on every page of the built docs and kitchen sink.
 *
 *   npm run build && npm run check:a11y
 *
 * Uses an installed Chrome: set CHROME_PATH if it isn't at the macOS default. Exits 1 on any
 * violation outside KNOWN, so a new problem fails while a recorded one doesn't hide others.
 * axe checks what a machine can; it doesn't replace testing with a keyboard and a screen reader.
 */
import { readFileSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';

import puppeteer from 'puppeteer-core';

import { root } from './lib/tokens.mjs';

const require = createRequire( import.meta.url );
const AXE = readFileSync( require.resolve( 'axe-core/axe.min.js' ), 'utf8' );
const CHROME =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// KNOWN GAP: form-error on Bold Gold (danger role, 3.59:1). See test/tokens.test.mjs.
const KNOWN = new Set( [ 'demo/components/ color-contrast #zip-err-gold' ] );

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2' };

function serve( dir ) {
	return http
		.createServer( async ( req, res ) => {
			let file = path.join( dir, decodeURIComponent( req.url.split( '?' )[ 0 ] ) );
			try {
				if ( ( await stat( file ) ).isDirectory() ) {
					file = path.join( file, 'index.html' );
				}
				res.writeHead( 200, { 'content-type': TYPES[ path.extname( file ) ] ?? 'application/octet-stream' } );
				res.end( await readFile( file ) );
			} catch {
				res.writeHead( 404 );
				res.end();
			}
		} )
		.listen( 0 );
}

async function pagesOf( dir ) {
	const files = await readdir( dir, { recursive: true } );
	return files
		.filter( ( f ) => f.endsWith( 'index.html' ) )
		.map( ( f ) => '/' + f.replace( /index\.html$/, '' ) )
		.sort();
}

const browser = await puppeteer.launch( { executablePath: CHROME, headless: true } );
const page = await browser.newPage();
await page.setViewport( { width: 1280, height: 900 } );

let failures = 0;
for ( const site of [ 'docs', 'demo' ] ) {
	const dir = path.join( root, '_site', site );
	const server = serve( dir );
	for ( const url of await pagesOf( dir ) ) {
		await page.goto( `http://localhost:${ server.address().port }${ url }`, { waitUntil: 'networkidle0' } );
		await page.addScriptTag( { content: AXE } );
		const result = await page.evaluate( () =>
			// eslint-disable-next-line no-undef
			axe.run( document, { runOnly: { type: 'tag', values: [ 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa' ] } } )
		);
		const found = result.violations.flatMap( ( v ) =>
			v.nodes.map( ( n ) => ( { key: `${ site }${ url } ${ v.id } ${ n.target.join( ' ' ) }`, help: v.help } ) )
		);
		const fresh = found.filter( ( f ) => ! KNOWN.has( f.key ) );
		const known = found.length - fresh.length;
		console.log( `${ fresh.length ? '✗' : '✓' } ${ site }${ url }${ known ? ` (${ known } known)` : '' }` );
		for ( const f of fresh ) {
			console.log( `    ${ f.key }: ${ f.help }` );
		}
		failures += fresh.length;
	}
	server.close();
}

await browser.close();
console.log( failures ? `${ failures } violations.` : 'No violations beyond the known ones.' );
process.exit( failures ? 1 : 0 );
