import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UsePipes
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export const GetExampleDtoSchema = z.discriminatedUnion('status', [
	z.object({
		id: z.string().uuid(),
		status: z.literal('DRAFT'),
		name: z.string().nullable()
	}),
	z.object({
		id: z.string().uuid(),
		status: z.literal('RELEASED'),
		name: z.string()
	})
]);
type GetExampleDto = z.infer<typeof GetExampleDtoSchema>;

const PostExampleDtoSchema = z.object({
	name: z.string()
});
type PostExampleDto = z.infer<typeof PostExampleDtoSchema>;

@Controller('examples')
export class ExampleController {
	@Get('/:id')
	@ApiResponse({ status: 200, schema: zodToOpenAPI(GetExampleDtoSchema) })
	getExample(@Param('id', ParseUUIDPipe) id: string): GetExampleDto {
		return { id: id, status: 'DRAFT', name: 'example' };
	}

	@Get()
	@ApiResponse({
		status: 200,
		schema: zodToOpenAPI(GetExampleDtoSchema.array())
	})
	getExamples(): GetExampleDto[] {
		return [
			{ id: randomUUID(), status: 'DRAFT', name: 'example' },
			{ id: randomUUID(), status: 'DRAFT', name: 'example' },
			{ id: randomUUID(), status: 'DRAFT', name: 'example' }
		];
	}

	@Post()
	@ApiResponse({ status: 201, schema: zodToOpenAPI(GetExampleDtoSchema) })
	@ApiBody({ schema: zodToOpenAPI(PostExampleDtoSchema) })
	@UsePipes(new ZodValidationPipe(PostExampleDtoSchema))
	createExample(@Body() input: PostExampleDto): GetExampleDto {
		return { id: randomUUID(), status: 'DRAFT', name: input.name };
	}
}
