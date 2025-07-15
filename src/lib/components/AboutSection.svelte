<script lang="ts">
	import arohLeads from '$lib/assets/images/thumbnails/test-project-2.webp?enhanced';
	import { aboutPage } from '$lib/content/singlePages/singlePages';
	import { cn } from '$lib/utils';
</script>

<section
	class={cn(
		'mx-auto flex max-w-[1440px] flex-col gap-x-12 px-4 sm:grid sm:grid-cols-[1fr_1fr_3fr] lg:grid-cols-7 lg:px-6',
		'relative gap-y-2 py-16 lg:py-24'
	)}
	aria-label="About a-roh"
	id="about"
>
	<h2 class="font-headings font-bold text-balance">
		{aboutPage.metadata.title}
	</h2>
	<enhanced:img
		src={arohLeads}
		alt="a-roh lead architects"
		class="max-h-[50svh] w-full object-contain object-left-top sm:aspect-square"
	/>
	<div class="pt-8 sm:contents">
		<div class="flex flex-col justify-between gap-6 lg:col-span-3">
			<div class="[&>h1]:font-headings flex flex-col gap-6">
				<aboutPage.Content />
			</div>
			<p class="mt-6">{aboutPage.metadata.professionalCredentials}</p>
		</div>
		<div class="flex flex-col gap-6 pt-12 lg:col-span-2">
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
			<ul class="flex flex-col gap-6">
				{#each aboutPage.metadata.addresses as address}
					<li>
						<strong class="font-headings">{address.label}</strong><br />
						{address.line1}<br />
						{address.line2}
					</li>
				{/each}
			</ul>
			<ul>
				{#each aboutPage.metadata.socials as social}
					<li>
						<a
							href={social.url}
							class="decoration-muted-foreground hover:decoration-foreground underline underline-offset-2 transition-colors"
							>{social.label}</a
						>
					</li>
				{/each}
			</ul>
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class={cn(
					'absolute top-12 right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full lg:top-22',
					'hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none',
					'text-muted-foreground hover:text-foreground focus-visible:text-foreground',
					'hover:bg-muted focus-visible:bg-muted transition-colors'
				)}
			>
				<span class="sr-only">Back to top</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"></path></svg
				>
			</button>
		</div>
	</div>
</section>
