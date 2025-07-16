<script lang="ts">
	import ogImageUrl from '$lib/assets/images/og-images/og-home.png';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import { projects } from '$lib/content/collections/collections';
	import { cn } from '$lib/utils';

	const animateClasses = [
		'animate-slide-up-1',
		'animate-slide-up-2',
		'animate-slide-up-3',
		'animate-slide-up-4',
		'animate-slide-up-5',
		'animate-slide-up-6',
		'animate-slide-up-7',
		'animate-slide-up-8',
		'animate-slide-up-9',
		'animate-slide-up-10'
	];
</script>

<MetaTags {ogImageUrl} path="/" />

<section
	class={cn(
		'xs:grid xs:grid-cols-2 flex flex-col sm:flex sm:flex-col',
		'border-foreground border-t-2'
	)}
>
	{#each projects as project, index (project.id)}
		<ProjectRow {project} class={animateClasses[Math.min(animateClasses.length - 1, index)]} />
	{/each}
</section>

<AboutSection />
