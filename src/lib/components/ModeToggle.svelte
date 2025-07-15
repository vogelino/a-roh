<script lang="ts">
	import { cn } from '$lib/utils';
	import { z } from 'zod/v4';

	const modes = ['light', 'dark'];
	let currentMode = $state<'light' | 'dark'>('light');
	const isDark = $derived(currentMode === 'dark');

	$effect(() => {
		if (typeof window !== 'undefined') {
			// Read the current mode from the document attribute that was set by the blocking script
			const appliedMode = document.documentElement.getAttribute('data-applied-mode');
			if (appliedMode && modes.includes(appliedMode)) {
				currentMode = parseMode(appliedMode);
			} else {
				// Fallback: check localStorage and apply
				const mode = window.localStorage.getItem('mode');
				if (mode && modes.includes(mode)) {
					document.documentElement.setAttribute('data-applied-mode', mode);
					currentMode = parseMode(mode);
				}
			}
		}
	});

	function setMode(newMode: 'light' | 'dark') {
		const mode = parseMode(newMode);

		function updateMode() {
			window.localStorage.setItem('mode', mode);
			document.documentElement.setAttribute('data-applied-mode', mode);
			currentMode = parseMode(mode);
		}

		if (!document.startViewTransition) {
			updateMode();
		} else {
			document.startViewTransition(updateMode);
		}
	}

	function parseMode(mode: string) {
		return z.enum(['light', 'dark']).catch('light').parse(mode);
	}
</script>

<button
	id="mode-toggle"
	class={cn(
		`mode-toggle inline-flex h-10 w-10 items-center justify-center`,
		`focus-visible:ring-foreground outline-hidden focus-visible:ring-2`,
		`text-muted-foreground hover:text-foreground cursor-pointer focus-visible:rounded-full`,
		`hover:bg-muted focus-visible:bg-muted rounded-full transition-colors`,
		`transition-colors`
	)}
	style="view-transition-name: mode-toggle;"
	title="Dark mode"
	role="switch"
	aria-checked={isDark}
	aria-label={isDark ? 'Dark mode' : 'Light mode'}
	onclick={() => {
		setMode(isDark ? 'light' : 'dark');
	}}
>
	{#if isDark}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-sun"
			style="vector-effect: non-scaling-stroke;"
		>
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-moon size-5"
			style="vector-effect: non-scaling-stroke;"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</svg>
	{/if}
</button>
