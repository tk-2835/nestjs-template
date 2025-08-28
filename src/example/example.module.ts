import { Module } from '@nestjs/common';
import { ExampleDataloader } from './application/example.dataloader';
import { ExampleScheduler } from './application/example.cron';
import { ExampleFactory } from './domain/example.factory';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExampleController } from './api/example.controller';

@Module({
	imports: [EventEmitterModule],
	providers: [ExampleFactory, ExampleDataloader, ExampleScheduler],
	controllers: [ExampleController],
})
export class ExampleModule {}
