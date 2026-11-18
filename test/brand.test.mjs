/**
 * The theme's main promise: an off-brand class produces no CSS, and every brand class does.
 */
import assert from 'node:assert/strict';
import { before, test } from 'node:test';

import { buildClasses, hasClass } from './helpers.mjs';

const OFF_BRAND = [
	'bg-red-500', 'text-blue-600', 'border-slate-200', 'bg-white/50x',
	'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-4xl',
	'text-xs', 'text-xl', 'text-3xl', 'text-9xl',
	'font-sans', 'font-serif',
	'shadow', 'shadow-sm', 'shadow-lg', 'shadow-2xl',
];

const ON_BRAND = [
	'bg-gold', 'text-black', 'bg-gray-050', 'text-horizon-deep', 'bg-gold/20',
	'text-link', 'bg-raised', 'border-line-strong', 'text-heading', 'bg-surface', 'outline-focus',
	'font-display', 'font-body', 'font-mono',
	'text-data', 'text-sm', 'text-base', 'text-lg', 'text-h1', 'text-h6', 'text-display',
	'px-gutter', 'py-section', 'min-h-tap', 'max-w-wide', 'max-w-content', 'max-w-measure',
	'shadow-overlay', 'rounded-none', 'tracking-heading', 'leading-body',
	'type-h1', 'type-h4', 'type-display', 'type-lead', 'type-data',
	'heading-underline', 'blockquote-quotation', 'media-background', 'media-background-container',
	'filter-sepia', 'layout-wide', 'layout-content', 'rich-text',
	'btn', 'btn-outline', 'btn-text', 'btn-sm', 'btn-lg', 'card', 'card-outline', 'card-media',
	'alert', 'alert-success', 'alert-danger', 'badge', 'badge-outline',
	'form-input', 'form-select', 'form-check', 'form-label', 'form-help', 'form-error',
	'data-table', 'data-table-striped', 'breadcrumb', 'pagination',
	'navbar', 'navbar-inner', 'navbar-brand', 'navbar-toggle', 'navbar-close', 'navbar-menu', 'navbar-links',
	'dropdown', 'dropdown-menu', 'accordion', 'modal', 'drawer', 'spinner', 'progress',
	'md:btn-lg', 'hover:filter-none', 'group-hover:filter-sepia',
];

let css;
before( async () => {
	css = await buildClasses( [ ...OFF_BRAND, ...ON_BRAND ] );
} );

test( 'off-brand utilities compile to nothing', () => {
	const leaked = OFF_BRAND.filter( ( c ) => hasClass( css, c ) );
	assert.deepEqual( leaked, [], `These should not exist: ${ leaked.join( ', ' ) }` );
} );

test( 'every brand utility and component compiles', () => {
	const missing = ON_BRAND.filter( ( c ) => ! hasClass( css, c ) );
	assert.deepEqual( missing, [], `These should exist: ${ missing.join( ', ' ) }` );
} );

test( 'roles compile to the --ucf-* variable itself, so they follow compositions', () => {
	assert.match( css, /\.text-link\s*\{\s*color:\s*var\(--ucf-link\)/ );
	assert.match( css, /\.bg-raised\s*\{\s*background-color:\s*var\(--ucf-raised\)/ );
} );
