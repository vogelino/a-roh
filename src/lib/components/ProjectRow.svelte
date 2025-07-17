<script lang="ts">
	import type { ProjectType } from '$lib/content/collections/collections';
	import { cn, getProjectThumnnail } from '$lib/utils';

	type Props = { project: ProjectType; class?: string };
	const { project, class: className = '' }: Props = $props();

	const projectThumbnail = $derived(getProjectThumnnail(project.id));
</script>

<article class={cn('border-foreground border-b-2', className)}>
	<a href="/{project.id}" class="hover:bg-muted flex flex-col gap-y-2 py-6 transition-colors">
		<div
			class="mx-auto flex w-full max-w-[1440px] flex-col gap-x-12 gap-y-2 px-4 sm:grid sm:grid-cols-[1fr_1fr_3fr] lg:grid-cols-7 lg:px-6"
		>
			<h2 class="font-headings font-bold text-balance">
				{project.title}
			</h2>
			<enhanced:img
				src={projectThumbnail.image}
				sizes="160px, 320px"
				alt={project.title}
				class="w-full object-contain sm:aspect-square lg:max-h-[50svh]"
			/>
			<div class="hidden flex-col gap-2 sm:flex lg:contents">
				<p>{@html project.type}</p>
				<p>{@html project.location}</p>
				<p>{@html project.status}</p>
				<p>{@html project.client}</p>
				<p>{@html project.size}</p>
			</div>
		</div>
	</a>
</article>
