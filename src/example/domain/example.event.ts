import { ExampleAggregate } from './example.aggregate';

export enum ExampleEvent {
	EXAMPLE_CREATED = 'EXAMPLE_CREATED',
	EXAMPLE_UPDATED = 'EXAMPLE_UPDATED',
	EXAMPLE_DELETED = 'EXAMPLE_DELETED'
}

export type ExampleCreatedEvent = {
	example: ExampleAggregate;
};

export type ExampleUpdatedEvent = {
	from: ExampleAggregate;
	to: ExampleAggregate;
};

export type ExampleDeletedEvent = {
	example: ExampleAggregate;
};
