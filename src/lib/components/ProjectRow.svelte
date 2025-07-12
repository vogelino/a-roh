<script lang="ts">
	import type { ProjectType } from '$lib/content/collections/collections';
	import { getProjectThumnnail } from '$lib/utils';

	type Props = { project: ProjectType };
	const { project }: Props = $props();

	$inspect(project.id);
	const projectThumbnail = $derived(getProjectThumnnail(project.id));
</script>

<article class="border-border border-b md:col-span-full md:grid md:grid-cols-subgrid">
	<a
		href="/{project.id}"
		class="hover:bg-muted flex flex-col gap-y-2 py-6 transition-colors md:col-span-full md:grid md:grid-cols-subgrid"
	>
		<h2>{project.title}</h2>
		<enhanced:img
			src={projectThumbnail.image}
			alt={project.title}
			class="aspect-square w-full object-contain"
		/>
		<div class="hidden flex-col gap-2 md:flex lg:contents">
			<p>{project.typology}</p>
			<p>{project.location}</p>
			<p>{project.status}</p>
			<p>{project.client}</p>
			<p>{project.size}</p>
		</div>
	</a>
</article>
