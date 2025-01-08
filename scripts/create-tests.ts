import * as fs from 'fs';
import * as path from 'path';

async function main() {
	console.log('Create tests');

	for (let i = 1; i <= 500; i++) {
		const content = `
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('${i}', () => {
	beforeAll(async () => {
		await Test.createTestingModule({
			imports: [AppModule]
		}).compile();
	});
	it('should be true (1)', async () => {
		expect(true).toBe(true);
	});
	it('should be true (2)', async () => {
		expect(true).toBe(true);
	});
	it('should be true (3)', async () => {
		expect(true).toBe(true);
	});
});
		`;

		const filePath = path.join(__dirname, `../test/${i}.test.ts`);
		fs.writeFileSync(filePath, content);
		console.log(filePath);
	}
}

main();
