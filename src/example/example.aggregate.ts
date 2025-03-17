import { z } from 'zod';

const AggregateSchema = z.object({
	id: z.string().uuid()
});

export const ExampleAggregateSchema = z.union([
	AggregateSchema.and(
		z.object({
			status: z.literal('DRAFT'),
			name: z.string().nullable()
		})
	),
	AggregateSchema.and(
		z.object({
			status: z.literal('RELEASED'),
			name: z.string()
		})
	)
]);

export type ExampleAggregate = z.infer<typeof ExampleAggregateSchema>;
