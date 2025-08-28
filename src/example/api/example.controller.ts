import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiResponseSchemaHost } from '@nestjs/swagger';
import { toJSONSchema, z } from 'zod';
import { randomUUID } from 'crypto';

// See: https://zod.dev/codecs?id=isodatetimetodate
const isoDatetimeToDate = z.codec(z.iso.datetime(), z.date(), {
	decode: (isoString) => new Date(isoString),
	encode: (date) => date.toISOString()
});

function toSchema(schema: z.ZodType) {
	return toJSONSchema(schema, {
		target: 'openapi-3.0',
		// See: https://zod.dev/json-schema?id=override
		unrepresentable: 'any',
		override: (ctx) => {
			const def = ctx.zodSchema._zod.def;
			if (def.type === 'date') {
				ctx.jsonSchema.type = 'string';
				ctx.jsonSchema.format = 'date-time';
				ctx.jsonSchema.examples = ['2021-01-30T08:30:00Z'];
			}
		}
	}) as unknown as ApiResponseSchemaHost['schema'];
}

export const GetShapeDtoSchema = z.discriminatedUnion('type', [
	z.object({
		id: z.uuid(),
		type: z.literal('BOX'),
		name: z.string().nullable(),
		length: z.number().min(0),
		width: z.number().min(0),
		height: z.number().min(0),
		date: isoDatetimeToDate
	}),
	z.object({
		id: z.uuid(),
		type: z.literal('CYLINDER'),
		name: z.string().nullable(),
		radius: z.number().min(0),
		height: z.number().min(0),
		date: isoDatetimeToDate
	})
]);
type GetShapeDto = z.infer<typeof GetShapeDtoSchema>;

const PostShapeDtoSchema = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('BOX'),
		name: z.string().nullable(),
		length: z.number().min(0),
		width: z.number().min(0),
		height: z.number().min(0),
		date: isoDatetimeToDate
	}),
	z.object({
		type: z.literal('CYLINDER'),
		name: z.string().nullable(),
		radius: z.number().min(0),
		height: z.number().min(0),
		date: isoDatetimeToDate
	})
]);
type PostShapeDto = z.infer<typeof PostShapeDtoSchema>;

@Controller('shapes')
export class ExampleController {
	@Get('/:id')
	@ApiResponse({ status: 200, schema: toSchema(GetShapeDtoSchema) })
	getExample(@Param('id', ParseUUIDPipe) id: string): GetShapeDto {
		return {
			id: id,
			type: 'BOX',
			name: null,
			length: 10,
			width: 10,
			height: 10,
			date: new Date()
		};
	}

	@Get()
	@ApiResponse({ status: 200, schema: toSchema(z.array(GetShapeDtoSchema)) })
	getExamples(): GetShapeDto[] {
		return [
			{
				id: randomUUID(),
				type: 'BOX',
				name: null,
				length: 10,
				width: 10,
				height: 10,
				date: new Date()
			},
			{
				id: randomUUID(),
				type: 'CYLINDER',
				name: null,
				radius: 5,
				height: 10,
				date: new Date()
			}
		];
	}

	@Post()
	@ApiResponse({ status: 201, schema: toSchema(GetShapeDtoSchema) })
	@ApiBody({ schema: toSchema(PostShapeDtoSchema) })
	createExample(@Body() input: PostShapeDto): GetShapeDto {
		const parsed = PostShapeDtoSchema.safeParse(input);

		if (!parsed.success) {
			throw new BadRequestException();
		}

		return { id: randomUUID(), ...parsed.data };
	}
}
