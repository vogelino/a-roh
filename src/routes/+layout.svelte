<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
</main>
