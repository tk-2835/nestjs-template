import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './app.module';

@Controller('')
export class AppController {
	constructor(private readonly configService: ConfigService<Config>) {}

	@Get()
	get(): unknown {
		return this.configService.get('PORT');
	}
}
