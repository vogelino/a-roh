<script module>
	import type { Snippet } from 'svelte';
	import a from './ContentLink.svelte';

	export { a };
</script>

<script lang="ts">
	const { children } = $props<{
		children: Snippet<[]>;
	}>();
</script>

{@render children()}
