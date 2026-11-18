import shared from '../shared/eleventy.mjs';

export default async function ( eleventyConfig ) {
	await shared( eleventyConfig, { name: 'demo' } );

	return {
		dir: {
			input: 'sites/demo',
			output: '_site/demo',
			includes: '_includes',
			layouts: '_layouts',
		},
		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'liquid',
	};
}
