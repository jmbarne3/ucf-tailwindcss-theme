/**
 * Eleventy setup shared by the docs and the kitchen sink: Markdown, syntax highlighting, the
 * `example` shortcode, the theme's fonts, and live reload when Tailwind rewrites the CSS.
 */
import { HtmlBasePlugin } from '@11ty/eleventy';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { createHighlighter } from 'shiki';

const LANGS = [ 'html', 'css', 'js', 'json', 'shell', 'jsx' ];
// A11Y: the high-contrast variant; plain github-light's greens and oranges fall below 4.5:1 on gray-050.
const THEME = 'github-light-high-contrast';

const escapeHtml = ( s ) =>
	s.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' );

/** Strip the indent every line shares and the blank lines at either end. */
export function dedent( text ) {
	const lines = text.replace( /^\s*\n|\n\s*$/g, '' ).split( '\n' );
	const indent = Math.min(
		...lines.filter( ( l ) => l.trim() ).map( ( l ) => l.match( /^\s*/ )[ 0 ].length )
	);
	return lines.map( ( l ) => l.slice( indent ) ).join( '\n' );
}

/**
 * WHY every newline becomes `&#10;` and blank lines are dropped: the shortcode's output lands
 * inside Markdown, where a blank line ends an HTML block and Markdown starts parsing the rest.
 * One unbroken block keeps the preview and the code exactly as written.
 */
const oneBlock = ( html ) => html.replace( /\n\s*\n/g, '\n' );
const preBlock = ( html ) => html.replace( /\n/g, '&#10;' );

export default async function shared( eleventyConfig, { name } ) {
	const highlighter = await createHighlighter( { themes: [ THEME ], langs: LANGS } );
	const highlight = ( code, lang ) =>
		highlighter.codeToHtml( code, {
			lang: LANGS.includes( lang ) ? lang : 'text',
			theme: THEME,
		} );

	const md = markdownIt( {
		html: true,
		linkify: false,
		typographer: true,
		highlight: ( code, lang ) => highlight( code.replace( /\n$/, '' ), lang ),
	} ).use( markdownItAnchor, {
		level: [ 2, 3 ],
		permalink: markdownItAnchor.permalink.headerLink( { safariReaderFix: true } ),
	} );
	eleventyConfig.setLibrary( 'md', md );

	eleventyConfig.addFilter( 'markdown', ( s ) => md.renderInline( s ?? '' ) );
	eleventyConfig.addFilter( 'highlight', ( code, lang = 'html' ) => preBlock( highlight( dedent( code ), lang ) ) );

	/*
	 * {% example %}…{% endexample %}: the markup rendered live, then the same markup as code.
	 * {% example "dark" %} sets the preview on a composition (light, alt, dark, dark-alt, gold).
	 */
	eleventyConfig.addPairedShortcode( 'example', ( content, composition = 'light' ) => {
		const code = dedent( content );
		return oneBlock(
			`<div class="docs-example">` +
				`<div class="docs-example-preview ucf-composition-${ escapeHtml( composition ) }">\n${ code }\n</div>` +
				`<div class="docs-example-code">${ preBlock( highlight( code, 'html' ) ) }</div>` +
				`</div>`
		);
	} );

	// The theme's optional font stylesheet and files, served as a site would serve them.
	eleventyConfig.addPassthroughCopy( {
		'src/fonts': 'assets/fonts',
		'src/fonts.css': 'assets/fonts.css',
	} );

	// Tailwind's CLI rewrites the site's CSS in its own process; reload the browser when it does.
	eleventyConfig.setServerOptions( { watch: [ `_site/${ name }/assets/*.css` ] } );
	eleventyConfig.addWatchTarget( 'sites/shared/' );

	/*
	 * Deployed, SITE_URL is where the docs live (e.g. https://user.github.io/repo) and the kitchen
	 * sink sits beneath it at /demo/. HtmlBasePlugin prefixes every root-relative href and src with
	 * that path, so templates keep writing `/assets/…`. WHY the cross-site links are absolute: the
	 * plugin leaves full URLs alone, but would prefix a root-relative one a second time.
	 */
	const site = process.env.SITE_URL?.replace( /\/$/, '' );
	const links = site
		? { docs: `${ site }/`, demo: `${ site }/demo/` }
		: { docs: 'http://localhost:8080/', demo: 'http://localhost:8081/' };
	eleventyConfig.addGlobalData( 'links', links );
	eleventyConfig.addPlugin( HtmlBasePlugin );

	return { pathPrefix: site ? new URL( links[ name ] ).pathname : '/' };
}
