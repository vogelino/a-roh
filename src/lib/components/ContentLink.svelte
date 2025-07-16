<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const { href, children } = $props<{
		href: string;
		children: Snippet<[]>;
	}>();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class={cn(
		`decoration-foreground/25 underline underline-offset-4`,
		`hyphen-auto box-decoration-clone`,
		`focus-visible:ring-foreground outline-hidden focus-visible:ring-2`,
		`focus-visible:ring-offset-bg focus-visible:ring-offset-2`,
		`focus-visible:no-underline`,
		`[text-decoration-skip-ink:none]`,
		`hover:decoration-foreground hover:text-bg hover:decoration-fg`,
		`motion-safe:transition-colors`
	)}
>
	{@render children()}
</a>
