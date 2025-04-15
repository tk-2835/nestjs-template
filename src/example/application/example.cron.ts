import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ExampleScheduler {
	@Cron(CronExpression.EVERY_30_SECONDS)
	schedule() {}
}
