<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import ModeToggle from './ModeToggle.svelte';

	let logoRef = $state<HTMLAnchorElement | null>(null);

	const aEl = $derived.by(() => logoRef?.querySelector('span:nth-child(1)') as HTMLSpanElement);
	const rohEl = $derived.by(() => logoRef?.querySelector('span:nth-child(3)') as HTMLSpanElement);

	const href = $derived(page.url.pathname === '/' ? '#about' : '/#');

	$effect(() => {
		function updateScrollPercentage() {
			const aboutEl = document.querySelector('#about');
			const logoContainerEl = document.querySelector('#logo-container');
			if (
				page.url.pathname !== '/' ||
				typeof window === 'undefined' ||
				!aEl ||
				!rohEl ||
				!logoContainerEl ||
				!aboutEl
			) {
				document.body.style.setProperty('--logoLineWidth', `6px`);
				return requestAnimationFrame(updateScrollPercentage);
			}
			const elsWidth = aEl.getBoundingClientRect().width + rohEl.getBoundingClientRect().width + 6;
			const availableWidth = logoContainerEl.getBoundingClientRect().width - elsWidth;
			const aboutElHeight = aboutEl.getBoundingClientRect().height;
			const totalScrollHeight = document.body.scrollHeight - aboutElHeight;
			const scrollPercentage = Math.max(
				0,
				Math.min((window.scrollY / totalScrollHeight) * 100, 100)
			);
			const dashSize = interpolate(6, availableWidth, 0, 100, scrollPercentage);
			document.body.style.setProperty('--logoLineWidth', `${dashSize}px`);

			return requestAnimationFrame(updateScrollPercentage);
		}

		const fr = updateScrollPercentage();

		return () => fr && cancelAnimationFrame(fr);
	});

	function interpolate(
		start: number,
		end: number,
		startRange: number,
		endRange: number,
		value: number
	): number {
		if (value < startRange || value > endRange) return start;
		const range = endRange - startRange;
		const progress = (value - startRange) / range;
		return start + (end - start) * progress;
	}

	function onLogoClick(event: MouseEvent) {
		if (page.url.pathname === '/' && href === '#about') {
			event.preventDefault();
			const aboutTop = document.querySelector('#about')?.getBoundingClientRect().top || 0;
			window.scrollTo({
				top: aboutTop + window.scrollY,
				behavior: 'smooth'
			});
		} else if (href === '/#') {
			window.scrollTo({ top: 0 });
		}
	}
</script>

<header
	class={cn(
		'sticky top-0 z-10 mx-auto px-4 py-6 lg:gap-6 lg:px-6',
		'grid max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4',
		'mix-blend-difference'
	)}
	style="view-transition-name: header;"
>
	<div class="@container" id="logo-container">
		<a
			bind:this={logoRef}
			{href}
			title="a-roh homepage"
			class="text-background dark:text-foreground flex h-10 w-[calc(100%+2rem)] -translate-x-4 items-center gap-0.5 rounded-full px-4 font-bold"
			onclick={onLogoClick}
		>
			<span>a</span>
			<span
				class="bg-background dark:bg-foreground h-[2px] w-[var(--logoLineWidth,6px)] translate-y-px transition-all duration-75"
			></span>
			<span>roh</span>
		</a>
	</div>
	<div class="flex items-center gap-2">
		<ModeToggle />
		{#if page.route.id !== '/'}
			<a
				href="/"
				class={cn(
					'flex h-10 w-10 items-center justify-center rounded-full',
					'hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none',
					'text-muted-foreground hover:text-foreground focus-visible:text-foreground',
					'hover:bg-muted focus-visible:bg-muted transition-colors'
				)}
				aria-label="Back to home"
			>
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
					class="lucide lucide-x"
					style="vector-effect: non-scaling-stroke;"
				>
					<path d="M18 6 6 18"></path>
					<path d="m6 6 12 12"></path>
				</svg>
			</a>
		{/if}
	</div>
</header>
