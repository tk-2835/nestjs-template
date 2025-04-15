import { Module } from '@nestjs/common';
import { ExampleController } from './api/example.controller';
import { ExampleDataloader } from './application/example.dataloader';
import { ExampleScheduler } from './application/example.cron';
import { ExampleFactory } from './domain/example.factory';

@Module({
	imports: [],
	providers: [ExampleFactory, ExampleDataloader, ExampleScheduler],
	controllers: [ExampleController]
})
export class ExampleModule {}
