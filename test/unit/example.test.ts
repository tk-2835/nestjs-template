import { ExampleDataloader } from '../../src/example/application/example.dataloader';

describe('Example', () => {
	test('Dataloader should return object', async () => {
		const dataloader = new ExampleDataloader();
		const result = await dataloader.load('1');

		expect(result).toMatchObject({ id: '1' });
	});
});
