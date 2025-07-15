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
		`focus-visible:ring-fg outline-hidden focus-visible:ring-2`,
		`focus-visible:rounded-full`
	)}
	title="Dark mode"
	role="switch"
	aria-checked={isDark}
	aria-label={isDark ? 'Dark mode' : 'Light mode'}
	onclick={() => {
		setMode(isDark ? 'light' : 'dark');
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		class="mode-toggle__within size-6"
		viewBox="0 0 32 32"
		fill="currentColor"
	>
		<clipPath id="mode-toggle__within__clip">
			<path d="M0 0h32v32h-32ZM6 16A1 1 0 0026 16 1 1 0 006 16" />
		</clipPath>
		<g clip-path="url(#mode-toggle__within__clip)">
			<path
				d="M30.7 21.3 27.1 16l3.7-5.3c.4-.5.1-1.3-.6-1.4l-6.3-1.1-1.1-6.3c-.1-.6-.8-.9-1.4-.6L16 5l-5.4-3.7c-.5-.4-1.3-.1-1.4.6l-1 6.3-6.4 1.1c-.6.1-.9.9-.6 1.3L4.9 16l-3.7 5.3c-.4.5-.1 1.3.6 1.4l6.3 1.1 1.1 6.3c.1.6.8.9 1.4.6l5.3-3.7 5.3 3.7c.5.4 1.3.1 1.4-.6l1.1-6.3 6.3-1.1c.8-.1 1.1-.8.7-1.4zM16 25.1c-5.1 0-9.1-4.1-9.1-9.1 0-5.1 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1c0 5.1-4 9.1-9.1 9.1z"
			/>
		</g>
		<path
			class="mode-toggle__within__circle"
			d="M16 7.7c-4.6 0-8.2 3.7-8.2 8.2s3.6 8.4 8.2 8.4 8.2-3.7 8.2-8.2-3.6-8.4-8.2-8.4zm0 14.4c-3.4 0-6.1-2.9-6.1-6.2s2.7-6.1 6.1-6.1c3.4 0 6.1 2.9 6.1 6.2s-2.7 6.1-6.1 6.1z"
		/>
		<path
			class="mode-toggle__within__inner"
			d="M16 9.5c-3.6 0-6.4 2.9-6.4 6.4s2.8 6.5 6.4 6.5 6.4-2.9 6.4-6.4-2.8-6.5-6.4-6.5z"
		/>
	</svg>
</button>

<style>
	:global(.mode-toggle) {
		--mode-toggle__within--duration: 500ms;
		border: none;
		background: 0 0;
		cursor: pointer;
	}

	:global(.mode-toggle__within *) {
		transform-origin: center;
		transition: transform calc(var(--mode-toggle__within--duration)) cubic-bezier(0, 0, 0, 1.25);
	}

	:global(.mode-toggle[aria-checked='false'] > .mode-toggle__within .mode-toggle__within__circle) {
		transform: scale(1.5);
	}

	:global(.mode-toggle[aria-checked='false'] > .mode-toggle__within .mode-toggle__within__inner) {
		transform: translate3d(3px, -3px, 0) scale(1.2);
	}

	:global(.mode-toggle[aria-checked='false'] > .mode-toggle__within g path) {
		transform: scale(0.65);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.mode-toggle:not(.mode-toggle--force-motion) *) {
			transition: none !important;
		}
	}
</style>
