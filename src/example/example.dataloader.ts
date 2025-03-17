import DataLoader from 'dataloader';

export class ExampleDataloader extends DataLoader<string, { id: string }> {
	constructor() {
		super(async (keys) => {
			return keys.map((key) => ({ id: key }));
		});
	}
}
