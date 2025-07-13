<script lang="ts">
	import { page } from '$app/state';

	let logoRef = $state<HTMLAnchorElement | null>(null);

	const aEl = $derived.by(() => logoRef?.querySelector('span:nth-child(1)') as HTMLSpanElement);
	const rohEl = $derived.by(() => logoRef?.querySelector('span:nth-child(3)') as HTMLSpanElement);

	const href = $derived(page.url.pathname === '/' ? '#about' : '/#');

	$effect(() => {
		function updateScrollPercentage() {
			if (typeof window === 'undefined' || !aEl || !rohEl) return;
			const elsWidth = aEl.getBoundingClientRect().width + rohEl.getBoundingClientRect().width + 6;
			document.body.style.setProperty(
				'--logoLineWidth',
				`max(6px, (${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}cqw - ${elsWidth}px))`
			);

			return requestAnimationFrame(updateScrollPercentage);
		}

		const fr = updateScrollPercentage();

		return () => fr && cancelAnimationFrame(fr);
	});
</script>

<header
	class="@container sticky top-0 mx-auto grid max-w-[1440px] grid-cols-[auto_1fr] items-center px-4 py-6 mix-blend-difference lg:px-6"
>
	<a
		bind:this={logoRef}
		{href}
		title="a-roh homepage"
		class="text-background grid grid-cols-[auto_1fr_auto] items-center gap-0.5 font-bold"
	>
		<span>a</span>
		<span class="bg-background inline-block h-[2px] w-[var(--logoLineWidth,6px)] translate-y-px"
		></span>
		<span>roh</span>
	</a>
	<span></span>
</header>
