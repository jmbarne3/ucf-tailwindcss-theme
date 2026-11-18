import { compile } from '@tailwindcss/node';
import { root } from '../scripts/lib/tokens.mjs';

/** Compile Tailwind plus the theme, and return the CSS for exactly these class names. */
export async function buildClasses( classes ) {
	const compiler = await compile( '@import "tailwindcss";\n@import "./src/index.css";', {
		base: root,
		onDependency() {},
	} );
	return compiler.build( classes );
}

/** Whether the compiled CSS contains a rule for the class `name`. */
export function hasClass( css, name ) {
	const escaped = name.replace( /[:/[\]().]/g, ( c ) => `\\\\${ c }` );
	return new RegExp( `\\.${ escaped }(?![\\w-])` ).test( css );
}
