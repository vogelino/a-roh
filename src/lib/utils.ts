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

function parseImagesForSlug(
	slug: string,
	images: Record<string, ImageType>,
	extension: string = 'webp'
) {
	return Object.entries(images)
		.filter(([url]) => {
			return url.includes(slug) && url.endsWith(`.${extension}`);
		})
		.map(([url, image]) => ({
			slug: url,
			image: image.default
		}));
}

export function getProjectThumnnail(slug: string) {
	const images = parseImagesForSlug(
		slug,
		import.meta.glob<ImageType>(`/src/lib/assets/images/projects-media/**/*.jpg`, {
			eager: true,
			query: {
				enhanced: true
			}
		}),
		'jpg'
	);
	return images[0] as {
		slug: string;
		image: BitmapImageType;
	};
}

export function getProjectImages(slug: string) {
	return parseImagesForSlug(
		slug,
		import.meta.glob<ImageType>(`/src/lib/assets/images/projects-media/**/*.jpg`, {
			eager: true,
			query: {
				enhanced: true
			}
		}),
		'jpg'
	) as {
		slug: string;
		image: BitmapImageType;
	}[];
}

export function getOgImage(slug: string) {
	const images = parseImagesForSlug(
		slug,
		import.meta.glob<ImageType>(`/src/lib/assets/images/og-images/*.png`, {
			eager: true,
			query: {
				enhanced: true
			}
		}),
		'png'
	);
	return images[0] as {
		slug: string;
		image: BitmapImageType;
	};
}
