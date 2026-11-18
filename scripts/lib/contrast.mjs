/**
 * WCAG 2.x contrast ratios for the token docs and tests. Colors are `#RRGGBB` or
 * `rgba(r, g, b, a)`; a translucent color is composited over the background first.
 */
const parse = ( color ) => {
	const hex = /^#([0-9a-f]{6})$/i.exec( color );
	if ( hex ) {
		const n = parseInt( hex[ 1 ], 16 );
		return [ ( n >> 16 ) & 255, ( n >> 8 ) & 255, n & 255, 1 ];
	}
	const rgba = /^rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)$/i.exec( color );
	if ( rgba ) {
		return [ +rgba[ 1 ], +rgba[ 2 ], +rgba[ 3 ], rgba[ 4 ] === undefined ? 1 : +rgba[ 4 ] ];
	}
	throw new Error( `contrast: can't read the color ${ color }` );
};

const over = ( [ r, g, b, a ], [ br, bg, bb ] ) => [
	r * a + br * ( 1 - a ),
	g * a + bg * ( 1 - a ),
	b * a + bb * ( 1 - a ),
];

const luminance = ( rgb ) => {
	const [ r, g, b ] = rgb.map( ( v ) => {
		const c = v / 255;
		return c <= 0.03928 ? c / 12.92 : ( ( c + 0.055 ) / 1.055 ) ** 2.4;
	} );
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** The contrast ratio of `foreground` on `background`, e.g. 4.53. */
export function contrast( foreground, background ) {
	const bg = parse( background );
	if ( bg[ 3 ] !== 1 ) {
		throw new Error( `contrast: the background ${ background } must be opaque` );
	}
	const a = luminance( over( parse( foreground ), bg ) );
	const b = luminance( bg.slice( 0, 3 ) );
	return ( Math.max( a, b ) + 0.05 ) / ( Math.min( a, b ) + 0.05 );
}
