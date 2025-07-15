<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	interface Props {
		status?: number;
		title: string;
		message: string;
		links?: { href: string; text: string; primary?: boolean }[];
	}

	let {
		status = 404,
		title = `Not found`,
		message = `The page you're looking for doesn't exist:`,
		links = [
			{
				href: `/`,
				text: `Home page`,
				primary: true
			}
		]
	}: Props = $props();
</script>

<main class="flex h-[calc(100svh-6rem)] items-center justify-center">
	<div class="mx-auto max-w-md p-6 pb-[10vh]">
		<h1
			class="text-foreground font-headings mt-4 text-5xl font-bold tracking-tight antialiased sm:text-6xl"
		>
			{status}
			<br />
			{title}
		</h1>
		<p class="text-muted-foreground mt-4 text-pretty">
			{message}
		</p>
		<p class="text-muted-foreground mt-2 text-pretty">
			<code class="border-border bg-gray-ultra-light border px-2 py-0.5 text-base">
				{page.url.pathname}
			</code>
		</p>
		<p class="text-muted-foreground mt-2 text-pretty">
			Review the URL or try your luck with the links below.
		</p>
		{#if links.length > 0}
			<div class="mt-6 flex items-center gap-4 max-md:flex-wrap">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class={cn(
							buttonVariants({
								variant: link.primary ? 'default' : 'secondary',
								className: 'text-base'
							})
						)}
					>
						{link.text}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</main>
