<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Header />

<main class="min-h-[calc(100svh-5.5rem)]">
	{@render children()}
</main>
