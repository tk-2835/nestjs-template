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

export const GetDtoSchema = z.discriminatedUnion('status', [
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
type GetDto = z.infer<typeof GetDtoSchema>;

const PostDtoSchema = z.object({
	name: z.string()
});
type PostDto = z.infer<typeof PostDtoSchema>;

@Controller('examples')
export class ExampleController {
	@Get('/:id')
	@ApiResponse({ status: 200, schema: zodToOpenAPI(GetDtoSchema) })
	getExample(@Param('id', ParseUUIDPipe) id: string): GetDto {
		return { id: id, status: 'DRAFT', name: 'example' };
	}

	@Get()
	@ApiResponse({ status: 200, schema: zodToOpenAPI(GetDtoSchema.array()) })
	getExamples(): GetDto[] {
		return [
			{ id: randomUUID(), status: 'DRAFT', name: 'example' },
			{ id: randomUUID(), status: 'DRAFT', name: 'example' },
			{ id: randomUUID(), status: 'DRAFT', name: 'example' }
		];
	}

	@Post()
	@ApiResponse({ status: 201, schema: zodToOpenAPI(GetDtoSchema) })
	@ApiBody({ schema: zodToOpenAPI(PostDtoSchema) })
	@UsePipes(new ZodValidationPipe(PostDtoSchema))
	createExample(@Body() input: PostDto): GetDto {
		return { id: randomUUID(), status: 'DRAFT', name: input.name };
	}
}
