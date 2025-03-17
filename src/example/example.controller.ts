import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export const GetDtoSchema = z.union([
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

@Controller()
export class ExampleController {
	@Get()
	@ApiResponse({
		status: 200,
		schema: zodToOpenAPI(GetDtoSchema)
	})
	get(): GetDto {
		return {
			id: randomUUID(),
			status: 'DRAFT',
			name: 'example'
		};
	}

	@Post()
	@ApiResponse({
		status: 201,
		schema: zodToOpenAPI(GetDtoSchema)
	})
	@ApiBody({ schema: zodToOpenAPI(PostDtoSchema) })
	@UsePipes(new ZodValidationPipe(PostDtoSchema))
	post(@Body() input: PostDto): GetDto {
		return {
			id: randomUUID(),
			status: 'DRAFT',
			name: input.name
		};
	}
}
