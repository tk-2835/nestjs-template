import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';

@Module({
	imports: [],
	controllers: [ExampleController]
})
export class ExampleModule {}
