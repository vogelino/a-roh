import { projects, type ProjectType } from '$lib/content/collections/collections';
import { componentToString } from '$lib/renderToString';
import { error } from '@sveltejs/kit';
import type { ComponentType } from 'svelte';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

type ProjectWithContentType = ProjectType & { Content?: ComponentType };

export const load: PageServerLoad = async ({ params }) => {
	const sortedProjects = projects.sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	) as ProjectWithContentType[];
	const currentIndex = sortedProjects.findIndex((p) => p.id === params.id);
	if (currentIndex === -1) {
		error(404, `Project with id "${params.id}" not found.`);
	}

	const project = sortedProjects[currentIndex] as ProjectWithContentType;

	if (!project) {
		error(404, `Project with id "${params.id}" not found.`);
	}

	return {
		project: { ...project, Content: undefined },
		projectContent: componentToString(project.Content as ComponentType)
	};
};

export const entries: EntryGenerator = () =>
	projects.map((project) => ({
		id: project.id
	}));
