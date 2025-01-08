import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('integration', () => {
	beforeAll(async () => {
		await Test.createTestingModule({
			imports: [AppModule]
		}).compile();
	});

	it('should be true', async () => {
		expect(true).toBe(true);
	});
});
