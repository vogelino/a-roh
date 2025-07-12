<script lang="ts">
	import ProjectRow from '$lib/components/ProjectRow.svelte';
	import { projects } from '$lib/content/collections/collections';
	import { aboutPage } from '$lib/content/singlePages/singlePages';
</script>

<main class="gap-x-12 md:grid md:grid-cols-[auto_1fr_1fr] lg:grid-cols-7">
	{#each projects as project}
		<ProjectRow {project} />
	{/each}
</main>

<div class="about">
	<h2>{aboutPage.metadata.title}</h2>
	<ul>
		{#each aboutPage.metadata.addresses as address}
			<li>
				<strong>{address.label}</strong><br />
				{address.line1}<br />
				{address.line2}
			</li>
		{/each}
	</ul>
	<ul>
		{#each aboutPage.metadata.emails as email}
			<li><a href="mailto:{email}">{email}</a></li>
		{/each}
	</ul>
	<ul>
		{#each aboutPage.metadata.phones as phone}
			<li><a href="tel:{phone}">{phone}</a></li>
		{/each}
	</ul>
	<ul>
		{#each aboutPage.metadata.socials as social}
			<li><a href={social.url}>{social.label}</a></li>
		{/each}
	</ul>
	<ul>
		{#each aboutPage.metadata.biographies as biography}
			<li>
				<strong>{biography.name}</strong><br />
				<p>{biography.bio}</p>
			</li>
		{/each}
	</ul>
	<div class="content">
		<aboutPage.Content />
	</div>
</div>
