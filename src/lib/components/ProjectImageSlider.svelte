<script lang="ts">
	import { goto } from '$app/navigation';
	import { cn, type ImageType } from '$lib/utils';
	import type { Options } from '@splidejs/splide';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	type Props = {
		images: { slug: string; image: ImageType['default'] }[];
		ariaLabel?: string;
		class?: string;
		options?: Options;
	};
	const {
		images,
		ariaLabel = 'Image slider',
		class: className = '',
		options = {}
	}: Props = $props();

	onMount(() => {
		function onEscapeKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				goto('/#');
			}
		}
		document.addEventListener('keydown', onEscapeKey);

		return () => {
			document.removeEventListener('keydown', onEscapeKey);
		};
	});
</script>

<div class="lg:p-10 lg:pt-0">
	<Splide
		class={cn('bg-background aspect-[3/4] w-full lg:max-h-[80vh]', className)}
		aria-label={ariaLabel}
		options={{
			type: 'slide',
			rewind: true,
			rewindByDrag: true,
			arrowPath:
				'M12.659 4.90904C13.4827 4.08536 14.7863 4.03418 15.67 4.7548L15.8414 4.90904L29.341 18.4086C30.2197 19.2873 30.2197 20.7124 29.341 21.5911L15.8414 35.0906C14.9628 35.9693 13.5376 35.9693 12.659 35.0906C11.7803 34.212 11.7803 32.7869 12.659 31.9082L24.5674 19.9998L12.659 8.09147L12.5047 7.92008C11.7841 7.03637 11.8353 5.73273 12.659 4.90904Z',
			...options,
			classes: {
				arrow: cn(
					'hidden lg:flex',
					'size-8 items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 z-10',
					'bg-background [&_path]:fill-muted-foreground [&_path]:transition-colors opacity-100 p-1.5 cursor-pointer',
					'[&:hover_path]:fill-foreground [&:focus-visible_pat]:fill-foreground',
					'hover:bg-muted focus-visible:bg-muted transition-colors',
					'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground'
				),
				prev: 'right-full -translate-x-2 -scale-x-100',
				next: 'left-full translate-x-2',
				pagination: 'splide__pagination translate-y-10',
				page: cn(
					'size-1.5 rounded-full inline-block m-0.75 transition-opacity',
					'bg-foreground opacity-20 scale-60 [&.is-active]:scale-100 [&.is-active]:opacity-90 hover:opacity-100 focus-visible:opacity-100',
					'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground'
				),
				...(options.classes || {})
			} satisfies Options['classes']
		}}
	>
		{#each images as image, index (image.slug)}
			<SplideSlide class="size-full">
				<enhanced:img
					src={image.image}
					alt={`Project image ${index + 1}`}
					class="aspect-[3/4] size-full object-contain object-center lg:max-h-[80vh]"
				/>
			</SplideSlide>
		{/each}
	</Splide>
</div>
