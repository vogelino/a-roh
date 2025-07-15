<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { aboutPage } from '$lib/content/singlePages/singlePages';

	type Props = {
		title?: string;
		description?: string;
		path: string;
		ogImageUrl: string;
		keywords?: string[];
	};

	const {
		title = 'a-roh - Architecture practice based in Paris and Basel',
		description = aboutPage.metadata.seoDescription,
		path,
		ogImageUrl,
		keywords
	}: Props = $props();

	const baseUrl = PUBLIC_BASE_URL || 'https://a-roh.com';

	const siteTitle = 'a-roh';
	const escapedTitle = $derived(title.replaceAll('&shy;', ''));
	const escapedDescription = $derived(description.replaceAll('*', ''));
	const titleWithSiteName = $derived(
		path === '/' ? escapedTitle : `${escapedTitle} – ${siteTitle}`
	);
	const canonicalUrl = $derived([baseUrl, path].join(''));
	const joinedKeywords = $derived(keywords?.join(','));
</script>

<svelte:head>
	<title>{titleWithSiteName}</title>
	<meta name="description" content={escapedDescription} />
	<meta property="og:title" content={titleWithSiteName} />
	<meta property="og:description" content={escapedDescription} />
	<meta property="og:url" content={[baseUrl, path].join('')} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image" content={[baseUrl, ogImageUrl].join('')} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={titleWithSiteName} />
	<meta name="twitter:description" content={escapedDescription} />
	<meta name="twitter:image" content={[baseUrl, ogImageUrl].join('')} />
	<meta name="color-scheme" content="light dark" />
	<meta name="application-name" content={siteTitle} />
	<meta name="author" content={siteTitle} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content={siteTitle} />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="msapplication-config" content="/browserconfig.xml" />
	<meta name="msapplication-starturl" content="/" />

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

	{#if keywords}
		<meta name="keywords" content={joinedKeywords} />
	{/if}
</svelte:head>
