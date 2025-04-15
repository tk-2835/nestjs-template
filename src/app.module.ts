import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as z from 'zod';
import { ExampleModule } from './example/example.module';
import { BullModule } from '@nestjs/bullmq';

const ConfigSchema = z.object({
	NODE_ENV: z.enum(['production', 'test']).catch('production'),
	PORT: z.string().catch('5000')
});
export type Config = z.infer<typeof ConfigSchema>;

@Module({
	imports: [
		ConfigModule.forRoot({ validate: ConfigSchema.parse }),
		ScheduleModule.forRoot(),
		BullModule.forRoot({
			connection: { host: 'localhost', port: 6379 }
		}),
		ExampleModule
	]
})
export class AppModule {}
