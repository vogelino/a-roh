<script lang="ts">
	import type { ProjectType } from '$lib/content/collections/collections';
	import { getProjectThumnnail } from '$lib/utils';

	type Props = { project: ProjectType };
	const { project }: Props = $props();

	const projectThumbnail = $derived(getProjectThumnnail(project.id));
</script>

<article class="border-border border-b">
	<a href="/{project.id}" class="hover:bg-muted flex flex-col gap-y-2 py-6 transition-colors">
		<div
			class="mx-auto flex w-full max-w-[1440px] flex-col gap-x-12 gap-y-2 px-4 sm:grid sm:grid-cols-[1fr_1fr_3fr] lg:grid-cols-7 lg:px-6"
		>
			<h2 class="font-headings font-bold">{project.title}</h2>
			<enhanced:img
				src={projectThumbnail.image}
				sizes="160px, 320px"
				alt={project.title}
				class="max-h-[50svh] w-full max-w-[320px] object-contain object-left-top sm:aspect-square"
			/>
			<div class="hidden flex-col gap-2 sm:flex lg:contents">
				<p>{project.typology}</p>
				<p>{project.location}</p>
				<p>{project.status}</p>
				<p>{project.client}</p>
				<p>{project.size}</p>
			</div>
		</div>
	</a>
</article>
