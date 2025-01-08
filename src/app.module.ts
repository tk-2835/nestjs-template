import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as z from 'zod';

const ConfigSchema = z.object({
	NODE_ENV: z.literal('production'),
	PORT: z.number().int().positive()
});

export type Config = z.infer<typeof ConfigSchema>;

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (config) => {
				return ConfigSchema.parse(config);
			}
		})
	]
})
export class AppModule {}
