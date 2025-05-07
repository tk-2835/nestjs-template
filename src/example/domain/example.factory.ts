import { Injectable } from '@nestjs/common';
import { ExampleAggregateSchema } from './example.aggregate';
import { randomUUID } from 'crypto';

@Injectable()
export class ExampleFactory {
	async create() {
		const example = ExampleAggregateSchema.parse({
			id: randomUUID(),
			status: 'DRAFT',
			name: 'Example'
		});

		return example;
	}
}
