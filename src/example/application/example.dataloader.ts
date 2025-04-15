import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ExampleDataloader extends DataLoader<string, { id: string }> {
	constructor() {
		super(async (keys) => {
			return keys.map((key) => ({ id: key }));
		});
	}
}
