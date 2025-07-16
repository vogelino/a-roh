<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ProjectImageSlider from '$lib/components/ProjectImageSlider.svelte';
	import { cn, getProjectImages, getProjectThumnnail } from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	if (!data?.project) {
		error(404, `Project with slug "${page.params.slug}" not found.`);
	}

	const project = $derived(data.project);
	const projectContent = $derived(data.projectContent);

	const projectImages = $derived(getProjectImages(project.id));
	const projectThumbnail = $derived(getProjectThumnnail(project.id));

	afterNavigate(() => {
		window.scrollTo(0, 0);
	});
</script>

<MetaTags
	title={project.title}
	description={project.seoDescription}
	ogImageUrl={projectThumbnail.image.img.src}
	path={`/${project.id}/`}
/>

<section
	class={cn(
		'relative mx-auto max-w-[1440px] px-4 py-6 lg:grid lg:grid-cols-[2fr_5fr] lg:gap-x-12 lg:px-6',
		'flex flex-col-reverse gap-12'
	)}
>
	<div class="flex flex-col justify-center">
		<h1
			class="font-headings animate-slide-up-1 mb-1 font-bold text-balance"
			style={`view-transition-name: project-title-${project.id};`}
		>
			{@html project.title}
		</h1>
		<div class="animate-slide-up-2 [&>p]:mb-2 [&>p]:text-pretty">
			{@html projectContent}
		</div>
		<dl class={cn(`text-muted-foreground mt-8 grid grid-cols-[auto_1fr] font-mono text-xs`)}>
			<dt class="border-border motion-safe:animate-slide-up-3 border-t py-2 pr-6">Type</dt>
			<dd
				class="border-border motion-safe:animate-slide-up-3 border-t py-2 @xs/sidebar:border-t @xs/sidebar:py-2"
			>
				{@html project.type}
			</dd>
			<dt class="border-border motion-safe:animate-slide-up-4 border-t py-2 pr-6">Location</dt>
			<dd
				class="border-border motion-safe:animate-slide-up-4 border-t py-2 @xs/sidebar:border-t @xs/sidebar:py-2"
			>
				{@html project.location}
			</dd>
			<dt class="border-border motion-safe:animate-slide-up-5 border-t py-2 pr-6">Status</dt>
			<dd
				class="border-border motion-safe:animate-slide-up-5 border-t py-2 @xs/sidebar:border-t @xs/sidebar:py-2"
			>
				{@html project.status}
			</dd>
			<dt class="border-border motion-safe:animate-slide-up-6 border-t py-2 pr-6">Client</dt>
			<dd
				class="border-border motion-safe:animate-slide-up-6 border-t py-2 @xs/sidebar:border-t @xs/sidebar:py-2"
			>
				{@html project.client}
			</dd>
			<dt class="border-border motion-safe:animate-slide-up-7 border-t py-2 pr-6">Size</dt>
			<dd
				class="border-border motion-safe:animate-slide-up-7 border-t py-2 @xs/sidebar:border-t @xs/sidebar:py-2"
			>
				{@html project.size}
			</dd>
		</dl>
	</div>
	<ProjectImageSlider images={projectImages} class="animate-slide-up-4" />
</section>
