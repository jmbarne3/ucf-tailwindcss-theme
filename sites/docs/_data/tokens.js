/**
 * Token data for the docs, read from tokens/tokens.json at build time, so every swatch, table
 * and contrast ratio on the Tokens pages is the value the theme ships.
 */
import { TEXT_NAMES } from '../../../scripts/build-tokens.mjs';
import { contrast } from '../../../scripts/lib/contrast.mjs';
import {
	compositions,
	loadTokens,
	primitives,
	resolve,
	roleNames,
} from '../../../scripts/lib/tokens.mjs';

const tokens = loadTokens();
const all = primitives( tokens );
const ratio = ( fg, bg ) => Math.round( contrast( fg, bg ) * 100 ) / 100;

// WHY these pairs: text roles must clear 4.5:1 on the section, and controls and graphics 3:1.
const TEXT_ROLES = [ 'body', 'heading', 'lead', 'muted', 'link', 'link-hover', 'accent-text', 'danger', 'success' ];

export default {
	colors: all
		.filter( ( t ) => t.group === 'color' )
		.map( ( t ) => ( {
			...t,
			utility: `bg-${ t.slug }`,
			onWhite: ratio( t.value, '#FFFFFF' ),
			onBlack: ratio( t.value, '#000000' ),
		} ) ),
	roles: [ ...roleNames( tokens ), 'surface' ],
	textRoles: TEXT_ROLES,
	compositions: compositions( tokens ).map( ( c ) => {
		const background = resolve( tokens, c.background );
		return {
			...c,
			backgroundHex: background,
			roles: Object.fromEntries(
				Object.entries( c.roles ).map( ( [ role, ref ] ) => {
					const value = resolve( tokens, ref );
					return [
						role,
						{
							ref: ref.replace( /[{}]/g, '' ),
							value,
							ratio: /^#|^rgb/.test( value ) ? ratio( value, background ) : null,
						},
					];
				} )
			),
		};
	} ),
	fontFamilies: all.filter( ( t ) => t.group === 'font-family' ),
	fontSizes: all
		.filter( ( t ) => t.group === 'font-size' )
		.map( ( t ) => ( { ...t, utility: `text-${ TEXT_NAMES[ t.slug ] }` } ) ),
	spacing: all.filter( ( t ) => t.group === 'spacing' ),
	custom: all.filter( ( t ) => t.group === 'custom' ),
	layout: all.filter( ( t ) => t.group === 'layout' ),
};
