import { Module } from '@nestjs/common';
import { ExampleDataloader } from './application/example.dataloader';
import { ExampleScheduler } from './application/example.cron';
import { ExampleFactory } from './domain/example.factory';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [EventEmitterModule],
	providers: [ExampleFactory, ExampleDataloader, ExampleScheduler]
})
export class ExampleModule {}
