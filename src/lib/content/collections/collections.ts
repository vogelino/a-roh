import slugify from 'slugify';
import { z } from 'zod/v4';

const globResultSchema = z
	.tuple([
		z.string(),
		z.looseObject({
			metadata: z.record(z.string(), z.unknown()),
			default: z.unknown()
		})
	])
	.describe('GlobResult');

function parseSvxFolder<Sch extends z.ZodType>(params: {
	globResult: Record<string, unknown>;
	schema: Sch;
}) {
	const allResultsMetadata = z
		.array(globResultSchema)
		.safeParse(Array.from(Object.entries(params.globResult)));

	if (allResultsMetadata.success) {
		const allResults = allResultsMetadata.data.map(([path, { metadata, default: content }]) => {
			const regex = /\/([\w-]+)\.\w+$/;
			const match = path.match(regex);
			const id = slugify(match ? match[1] : path, { lower: true, strict: true });
			return {
				id,
				...metadata,
				Content: content as () => Element
			};
		});
		return z.array(params.schema).parse(allResults);
	} else {
		throw new Error('Failed to parse Svx folder: \n\r' + z.prettifyError(allResultsMetadata.error));
	}
}

const meterFormatter = new Intl.NumberFormat('en-UK', {
	style: 'unit',
	unit: 'meter', // Using 'meter' as the closest available unit
	unitDisplay: 'narrow'
});

const projectSchema = z
	.looseObject({
		id: z.string(),
		title: z.string(),
		seoDescription: z.string().default(''),
		type: z.string().default(''),
		location: z.string().default(''),
		status: z.string().default(''),
		client: z.string().default(''),
		size: z
			.number()
			.transform((val) => (val ? `${meterFormatter.format(val).replace(/m$/, '')}&thinsp;m²` : '-'))
			.default('-'),
		pubDate: z.coerce.date().default(new Date()),
		Content: z.any()
	})
	.describe('Project');

export const projects = parseSvxFolder({
	globResult: import.meta.glob('/src/lib/content/collections/projects/*.svx', {
		eager: true
	}),
	schema: projectSchema
})
	.filter((project) => !project.hidden)
	.sort((a, b) => b.id.localeCompare(a.id));
export type ProjectType = (typeof projects)[number];
