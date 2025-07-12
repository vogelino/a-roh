import { clsx, type ClassValue } from 'clsx';
import type { SvelteHTMLElements } from 'svelte/elements';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export type BitmapImageType = {
	sources: {
		avif: string;
		webp: string;
		png: string;
	};
	img: {
		src: string;
		w: number;
		h: number;
	};
};

export type ImageType = {
	default: SvelteHTMLElements['enhanced:img']['src'];
};

function parseImagesForSlug(slug: string, images: Record<string, ImageType>) {
	return Object.entries(images)
		.filter(([url]) => url.includes(`${slug}.webp`))
		.map(([url, image]) => ({
			slug: url,
			image: image.default
		}));
}

export function getProjectThumnnail(slug: string) {
	const images = parseImagesForSlug(
		slug,
		import.meta.glob<ImageType>(`/src/assets/images/thumbnails/*.webp`, {
			eager: true,
			query: {
				enhanced: true
			}
		})
	);
	return images[0];
}
