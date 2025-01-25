import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as z from 'zod';
import { AppController } from './app.controller';

const ConfigSchema = z.object({
	NODE_ENV: z.enum(['production', 'test']).default('production'),
	PORT: z.string().default('5000')
});

export type Config = z.infer<typeof ConfigSchema>;

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (config) => {
				return ConfigSchema.parse(config);
			}
		})
	],
	controllers: [AppController]
})
export class AppModule {}
