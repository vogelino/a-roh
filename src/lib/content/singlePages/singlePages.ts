import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Typescript does not support svx files
import Content, { metadata as aboutMetadata } from './about.svx';

const aboutSchema = z.strictObject({
	title: z.string(),
	seoDescription: z.string().default(''),
	addresses: z
		.array(
			z.strictObject({
				label: z.string(),
				line1: z.string(),
				line2: z.string()
			})
		)
		.default([]),
	emails: z.array(z.string()).default([]),
	phones: z.array(z.string()).default([]),
	socials: z
		.array(
			z.strictObject({
				label: z.string(),
				url: z.string()
			})
		)
		.default([]),
	photoCopyright: z.string().default('')
});

export const aboutPage = {
	metadata: aboutSchema.parse(aboutMetadata),
	Content
};
