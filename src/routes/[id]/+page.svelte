<script lang="ts">
	import { page } from '$app/state';
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import { error } from '@sveltejs/kit';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	if (!data?.project) {
		error(404, `Project with slug "${page.params.slug}" not found.`);
	}

	const project = $derived(data.project);
</script>

<ProjectRow {project} />
