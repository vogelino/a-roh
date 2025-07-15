import { createRSSFeed } from '$lib/rssUtil';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return createRSSFeed();
}
