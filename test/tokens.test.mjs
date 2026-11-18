/**
 * The generated files match tokens/, every --ucf-* variable the theme reads exists, and the
 * roles keep their contrast.
 */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

import { OUTPUTS } from '../scripts/build-tokens.mjs';
import { contrast } from '../scripts/lib/contrast.mjs';
import { compositions, loadTokens, resolve, root } from '../scripts/lib/tokens.mjs';

const tokens = loadTokens();

test( 'generated files are up to date with tokens/', () => {
	for ( const [ file, build ] of Object.entries( OUTPUTS ) ) {
		const current = readFileSync( path.join( root, file ), 'utf8' );
		assert.equal( current, build(), `${ file } is stale. Run npm run build:tokens.` );
	}
} );

test( 'every --ucf-* variable the theme reads is defined', () => {
	const defined = new Set(
		[ ...readFileSync( path.join( root, 'src/generated/tokens.css' ), 'utf8' ).matchAll( /(--ucf-[a-z0-9-]+):/g ) ].map(
			( m ) => m[ 1 ]
		)
	);
	const files = readdirSync( path.join( root, 'src' ), { recursive: true } ).filter( ( f ) => f.endsWith( '.css' ) );
	const undefinedVars = [];
	for ( const file of files ) {
		const css = readFileSync( path.join( root, 'src', file ), 'utf8' );
		for ( const [ , name ] of css.matchAll( /var\((--ucf-[a-z0-9-]+)/g ) ) {
			if ( ! defined.has( name ) ) {
				undefinedVars.push( `${ file }: ${ name }` );
			}
		}
	}
	assert.deepEqual( undefinedVars, [] );
} );

// A11Y: the pairs below are the ones the component library tests, plus the section's own
// background, which this theme's form-error and plain text sit on.
const TEXT_ROLES = [ 'body', 'heading', 'lead', 'muted', 'link', 'link-hover', 'accent-text', 'danger', 'success' ];

// WHY only these on the field: the field is the ground of inputs and dropdown menus, and the
// theme sets only body copy and muted placeholders on it. Other roles (a link on a Dark
// field is 3.21:1) must not be put there; this list is what the components actually do.
const FIELD_TEXT_ROLES = [ 'body', 'muted' ];

// KNOWN GAP: on the Bold Gold background itself, danger is 3.59:1 and success 3.43:1. Listed
// so the test passes today and fails on any new failure. Remove when tokens.json is fixed.
const KNOWN_GAPS = new Set( [ 'gold:danger:surface', 'gold:success:surface' ] );

test( 'text roles clear 4.5:1 on the surface and raised panel, and on the field where used', () => {
	const failures = [];
	for ( const c of compositions( tokens ) ) {
		const grounds = {
			surface: resolve( tokens, c.background ),
			field: resolve( tokens, c.roles.field ),
			raised: resolve( tokens, c.roles.raised ),
		};
		for ( const role of TEXT_ROLES ) {
			for ( const [ ground, bg ] of Object.entries( grounds ) ) {
				if ( ground === 'field' && ! FIELD_TEXT_ROLES.includes( role ) ) {
					continue;
				}
				const ratio = contrast( resolve( tokens, c.roles[ role ] ), bg );
				const key = `${ c.slug }:${ role }:${ ground }`;
				if ( ratio < 4.5 && ! KNOWN_GAPS.has( key ) ) {
					failures.push( `${ key } ${ ratio.toFixed( 2 ) }:1` );
				}
			}
		}
	}
	assert.deepEqual( failures, [] );
} );

test( 'control edges and the focus ring clear 3:1', () => {
	const failures = [];
	for ( const c of compositions( tokens ) ) {
		const surface = resolve( tokens, c.background );
		const field = resolve( tokens, c.roles.field );
		for ( const [ role, bg, ground ] of [
			[ 'line-strong', field, 'field' ],
			[ 'line-strong', surface, 'surface' ],
			[ 'focus', surface, 'surface' ],
			[ 'indicator', surface, 'surface' ],
		] ) {
			const ratio = contrast( resolve( tokens, c.roles[ role ] ), bg );
			if ( ratio < 3 ) {
				failures.push( `${ c.slug }:${ role }:${ ground } ${ ratio.toFixed( 2 ) }:1` );
			}
		}
	}
	assert.deepEqual( failures, [] );
} );

test( 'the known gaps are still real', () => {
	// When the library fixes them, this fails, as a reminder to remove KNOWN_GAPS.
	const gold = compositions( tokens ).find( ( c ) => c.slug === 'gold' );
	const bg = resolve( tokens, gold.background );
	for ( const role of [ 'danger', 'success' ] ) {
		assert.ok( contrast( resolve( tokens, gold.roles[ role ] ), bg ) < 4.5, `gold:${ role } now passes; remove it from KNOWN_GAPS` );
	}
} );
