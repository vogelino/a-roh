<script lang="ts">
	import { projects } from '$lib/content/collections/collections';
	import { aboutPage } from '$lib/content/singlePages/singlePages';
</script>

{#each projects as project}
	<div class="project">
		<h2>{project.title}</h2>
		<p><strong>Location:</strong> {project.location}</p>
		<p><strong>Status:</strong> {project.status}</p>
		<p><strong>Client:</strong> {project.client}</p>
		<p><strong>Size:</strong> {project.size}</p>
		<p><strong>Year:</strong> {project.year}</p>
		<div class="content"><project.Content /></div>
	</div>
{/each}

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
