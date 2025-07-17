<script lang="ts">
	import arohLeads from '$lib/assets/images/a-roh_bio_pic_by_nikita_thevoz.jpg?enhanced';
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
		class="max-h-[50svh] w-full object-contain sm:aspect-square"
		sizes="160px"
	/>
	<div class="pt-8 sm:contents">
		<div class="flex flex-col justify-between gap-6 lg:col-span-3">
			<div
				class={cn(
					'text-sm [&>p]:text-pretty',
					'[&>h1]:font-headings [&>h1]:mt-4 [&>h1]:text-base [&>h1]:font-bold [&>h1]:text-balance [&>h1]:first:mt-0',
					'[&>h2]:font-headings [&>h2]:mt-4 [&>h2]:text-base [&>h2]:font-bold [&>h2]:text-balance [&>h2]:first:mt-0',
					'[&>h3]:font-headings [&>h3]:mt-4 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-balance [&>h3]:first:mt-0',
					'[&>h4]:font-headings [&>h4]:mt-4 [&>h4]:text-base [&>h4]:font-bold [&>h4]:text-balance [&>h4]:first:mt-0',
					'[&_a]:decoration-muted-foreground/25 [&_a]:hover:decoration-foreground [&_a]:underline',
					'[&_a]:focus-visible:outline-foreground [&_a]:underline-offset-2 [&_a]:transition-colors',
					'[&_li]:text-balance [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1',
					'flex flex-col gap-2.5'
				)}
			>
				<aboutPage.Content />

				<p class="mt-2">©&thinsp;{new Date().getFullYear()} - a-roh - all rights reserved</p>
			</div>
		</div>
		<div class="flex flex-col gap-5 pt-8 text-sm lg:col-span-2">
			<ul>
				{#each aboutPage.metadata.emails as email}
					<li>
						<a
							href="mailto:{email}"
							itemprop="email"
							class={cn(
								'decoration-muted-foreground/25 hover:decoration-foreground underline underline-offset-2 transition-colors',
								'focus-visible:outline-foreground focus-visible:decoration-foreground focus-visible:underline-offset-2'
							)}
						>
							{email}
						</a>
					</li>
				{/each}
			</ul>
			<ul>
				{#each aboutPage.metadata.phones as phone}
					<li>
						<a
							href="tel:{phone}"
							itemprop="telephone"
							class={cn(
								'decoration-muted-foreground/25 hover:decoration-foreground underline underline-offset-2 transition-colors',
								'focus-visible:outline-foreground focus-visible:decoration-foreground focus-visible:underline-offset-2'
							)}
						>
							{phone}
						</a>
					</li>
				{/each}
			</ul>
			<ul class="flex flex-col gap-6">
				{#each aboutPage.metadata.addresses as address}
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${address.line1},${address.line2}`}
						target="_blank"
						rel="noopener noreferrer"
						itemscope
						itemtype="https://schema.org/PostalAddress"
						class={cn(
							'decoration-muted-foreground/25 hover:decoration-foreground underline underline-offset-2 transition-colors',
							'focus-visible:outline-foreground focus-visible:decoration-foreground focus-visible:underline-offset-2'
						)}
					>
						<span itemprop="streetAddress">{address.line1}</span><br />
						<span itemprop="addressLocality">{address.line2}</span>
					</a>
				{/each}
			</ul>
			<ul>
				{#each aboutPage.metadata.socials as social}
					<li>
						<a
							href={social.url}
							itemprop="sameAs"
							class={cn(
								'decoration-muted-foreground/25 hover:decoration-foreground underline underline-offset-2 transition-colors',
								'focus-visible:outline-foreground focus-visible:decoration-foreground focus-visible:underline-offset-2'
							)}
						>
							{social.label}
						</a>
					</li>
				{/each}
			</ul>
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class={cn(
					'absolute top-13 right-4 z-10 flex h-10 w-10 translate-y-0.5 items-center justify-center rounded-full lg:top-22 lg:right-6',
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
