import shared from '../shared/eleventy.mjs';

export default async function ( eleventyConfig ) {
	const { pathPrefix } = await shared( eleventyConfig, { name: 'docs' } );

	// The sidebar: every page with a `section`, grouped in SECTIONS order, then by `order`.
	const SECTIONS = [ 'Getting Started', 'Tokens', 'Layout', 'Content', 'Components', 'Utilities' ];
	eleventyConfig.addCollection( 'nav', ( api ) =>
		SECTIONS.map( ( title ) => ( {
			title,
			pages: api
				.getAll()
				.filter( ( p ) => p.data.section === title )
				.sort( ( a, b ) => ( a.data.order ?? 99 ) - ( b.data.order ?? 99 ) ),
		} ) )
	);

	return {
		pathPrefix,
		dir: {
			input: 'sites/docs',
			output: '_site/docs',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'liquid',
	};
}
