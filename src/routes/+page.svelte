<script lang="ts">
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import AboutSection from '$lib/components/ui/AboutSection.svelte';
	import { projects } from '$lib/content/collections/collections';
</script>

<section class="xs:grid xs:grid-cols-2 flex flex-col sm:flex sm:flex-col">
	{#each projects as project (project.id)}
		<ProjectRow {project} />
	{/each}
</section>

<AboutSection />
