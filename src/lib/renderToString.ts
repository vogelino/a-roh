import type { ComponentType } from 'svelte';
import { render } from 'svelte/server';

export function componentToString(Component: ComponentType) {
	if (!Component) return '';
	return render(Component)
		.body.replaceAll('<!--[-->', '')
		.replaceAll('<!--]-->', '')
		.replaceAll('<!---->', '');
}
