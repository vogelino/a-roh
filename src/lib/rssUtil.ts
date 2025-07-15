import { PUBLIC_BASE_URL } from '$env/static/public';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import type { ComponentType } from 'svelte';
import { projects } from './content/collections/collections';
import { componentToString } from './renderToString';
import { getProjectImages, getProjectThumnnail, type BitmapImageType } from './utils';

function stripMarkdown(str: string) {
	return str
		.replace('..', '.')
		.replaceAll('*', '')
		.replaceAll(/\[(.+)\]\(.+\)/gi, '$1')
		.replaceAll(/&.*?;/gi, '');
}

export async function createRSSFeed(options: { title?: string; description?: string } = {}) {
	const site = PUBLIC_BASE_URL;
	const ogHome = undefined; // getOgImage('home');
	return rss({
		title: options.title || 'a-roh',
		description: `${options.description || 'Architecture practice based in Paris and Basel'}`,
		site,
		xmlns: {
			content: 'http://purl.org/rss/1.0/modules/content/',
			webfeeds: 'http://webfeeds.org/rss/1.0'
		},
		customData: `
		${ogHome && `<webfeeds:cover image="${site}${ogHome.image.img.src}" />`}
		<webfeeds:icon>${site}/apple-touch-icon.png</webfeeds:icon>
		<webfeeds:logo>${site}/safari-pinned-tab.svg</webfeeds:logo>
		<webfeeds:accentColor>#000</webfeeds:accentColor>
		<webfeeds:related layout=”card” target=”browser”/>
		`,
		items: (await getRSSProjectItems(site)).sort(
			(a, b) => (b.pubDate || new Date()).getTime() - (a.pubDate || new Date()).getTime()
		)
	});
}

async function getRSSProjectItems(site: string): Promise<RSSFeedItem[]> {
	return await Promise.all(
		projects.map(async (p) => {
			const ogImage = getProjectThumnnail(p.id);
			const title = stripMarkdown(p.title);
			const imageAlt = `Cover image for the project '${title}'`;
			const imageString = ogImage
				? `<img src="${site}${ogImage.image.img.src}" alt="${imageAlt}" />`
				: '';
			const content = await getProjectHTMLContentBySlug(p.id, site);
			return {
				title: `New project: ${title}!`,
				pubDate: p.date,
				description: [ogImage ? imageString : ''].join(' '),
				link: `/projects/${p.id}/`,
				enclosure: getEnclosureByImage(site, ogImage.image),
				content,
				customData: ogImage && `<webfeeds:cover image="${site}${ogImage.image.img.src}" />`,
				categories: [p.typology, p.location, p.status, p.client, p.size]
			} satisfies RSSFeedItem;
		})
	);
}

async function getProjectHTMLContentBySlug(slug: string, site: string) {
	const p = projects.find((p) => p.id === slug);
	if (!p) return;
	const thumbnail = getProjectThumnnail(slug);
	const images = getProjectImages(slug);
	return [
		thumbnail &&
			`<img src="${site}${thumbnail.image.img.src}" alt="Thumbnail of the project ${p.title}" />`,
		p.title && `<h1>${p.title.replaceAll('*', '')}</h1>`,
		renderHTMLList(
			'Project images',
			images.map(
				(i, idx) =>
					`<img src="${site}${i.image.img.src}" alt="Project image ${idx + 1} for ${p.title}" />`
			)
		),
		`<h2>About this project</h2>`,
		componentToString((p as unknown as { Content: ComponentType }).Content)
	]
		.filter(Boolean)
		.join('');
}

function renderHTMLList(title: string, list?: string[]) {
	const l = list?.filter(Boolean) || [];
	if (l.length === 0) return '';
	return `<h2>${title}</h2>
  <ul>
    ${l.map((item) => `<li>${item}</li>`).join('')}
  </ul>`;
}

function getEnclosureByImage(site: string, image?: BitmapImageType) {
	if (!image) return;
	const imgUrl = typeof image === 'string' ? image : image?.img?.src;
	if (!imgUrl) return;
	const w = image.img.w || 40;
	const h = image.img.h || 40;
	return {
		url: [site, imgUrl].join(''),
		type: `image/${imgUrl.split('.').pop()}`,
		length: w * h
	};
}
