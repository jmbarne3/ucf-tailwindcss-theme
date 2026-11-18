/**
 * Reads tokens/tokens.json (W3C Design Tokens format) for the build, the docs and the tests.
 *
 * Every primitive becomes a `--ucf-{group}-{slug}` custom property, the same name the
 * component library's ucf.css gives it, so a theme utility and a library component read one
 * variable. Roles (`treatment`) become `--ucf-{role}`, and each composition is a
 * `.ucf-composition-{slug}` class that re-points the roles for the section it is set on.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '../..' );

const PRIMITIVE_GROUPS = [ 'color', 'font-family', 'font-size', 'spacing', 'shadow', 'custom', 'layout' ];

export function loadJson( file ) {
	return JSON.parse( readFileSync( path.join( root, 'tokens', file ), 'utf8' ) );
}

export const loadTokens = () => loadJson( 'tokens.json' );
export const loadElements = () => loadJson( 'elements.json' );

/** The child entries of a token group, skipping `$type`, `$description` and the rest. */
export const children = ( group ) =>
	Object.entries( group ).filter( ( [ key ] ) => ! key.startsWith( '$' ) );

export const ucfExtension = ( token ) => token?.$extensions?.[ 'edu.ucf' ] ?? {};

export const primitiveVar = ( group, slug ) => `--ucf-${ group }-${ slug }`;
export const roleVar = ( role ) => `--ucf-${ role }`;

/** Every primitive, in file order: `{ group, slug, name, value, description, cssVar }`. */
export function primitives( tokens ) {
	return PRIMITIVE_GROUPS.flatMap( ( group ) =>
		children( tokens[ group ] ?? {} ).map( ( [ slug, token ] ) => ( {
			group,
			slug,
			name: ucfExtension( token ).name ?? slug,
			value: token.$value,
			description: token.$description ?? '',
			cssVar: primitiveVar( group, slug ),
		} ) )
	);
}

/** `{color.gold}` → `var(--ucf-color-gold)`. Plain values pass through. */
export function toCss( value ) {
	return String( value ).replace( /\{([a-z-]+)\.([a-z0-9-]+)\}/g, ( _, group, slug ) =>
		group === 'role' ? `var(${ roleVar( slug ) })` : `var(${ primitiveVar( group, slug ) })`
	);
}

/** `{color.gold}` → `#EDB80D`, following references until a literal value is reached. */
export function resolve( tokens, value ) {
	const match = /^\{([a-z-]+)\.([a-z0-9-]+)\}$/.exec( String( value ) );
	if ( ! match ) {
		return value;
	}
	const target = tokens[ match[ 1 ] ]?.[ match[ 2 ] ];
	if ( ! target ) {
		throw new Error( `tokens.json: ${ value } names no token.` );
	}
	return resolve( tokens, target.$value );
}

/** Each treatment and the role → reference map it sets. */
export function treatments( tokens ) {
	return children( tokens.treatment ).map( ( [ name, group ] ) => ( {
		name,
		roles: Object.fromEntries( children( group ).map( ( [ role, token ] ) => [ role, token.$value ] ) ),
	} ) );
}

/**
 * Each composition: its background and text, the treatment it uses, and its roles, which are
 * the treatment's with the composition's own overrides (`raised`, `field`) on top.
 */
export function compositions( tokens ) {
	const byName = Object.fromEntries( treatments( tokens ).map( ( t ) => [ t.name, t ] ) );

	return children( tokens.composition ).map( ( [ slug, group ] ) => {
		const ext = ucfExtension( group );
		const treatment = byName[ ext.treatment ];
		if ( ! treatment ) {
			throw new Error( `tokens.json: composition ${ slug } names no treatment.` );
		}
		const overrides = Object.fromEntries(
			children( group )
				.filter( ( [ key ] ) => key !== 'background' && key !== 'text' )
				.map( ( [ key, token ] ) => [ key, token.$value ] )
		);
		return {
			slug,
			name: ext.name ?? slug,
			description: group.$description ?? '',
			treatment: treatment.name,
			background: group.background.$value,
			text: group.text.$value,
			roles: { ...treatment.roles, ...overrides },
		};
	} );
}

/** The role names, in the light treatment's order. Every treatment defines the same set. */
export function roleNames( tokens ) {
	const [ first, ...rest ] = treatments( tokens );
	const names = Object.keys( first.roles );
	for ( const t of rest ) {
		const missing = names.filter( ( n ) => ! ( n in t.roles ) );
		if ( missing.length ) {
			throw new Error( `tokens.json: treatment ${ t.name } lacks ${ missing.join( ', ' ) }.` );
		}
	}
	return names;
}
