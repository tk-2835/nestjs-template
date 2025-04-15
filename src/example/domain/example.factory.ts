import { Injectable } from '@nestjs/common';
import { ExampleAggregate } from './example.aggregate';
import { randomUUID } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ExampleFactory {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	async create() {
		const example: ExampleAggregate = {
			id: randomUUID(),
			status: 'DRAFT',
			name: 'Example'
		};

		await this.eventEmitter.emitAsync('example.created', example);

		return example;
	}
}
