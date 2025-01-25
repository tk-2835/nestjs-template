import * as fs from 'fs';
import * as path from 'path';

async function main() {
	for (let i = 1; i <= 100; i++) {
		const content = `
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { NestApplication } from '@nestjs/core';
import axios from 'axios';

describe('${i}', () => {
	let app: NestApplication;
	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();
		app = module.createNestApplication();
		await app.listen('5000');
	});

	afterAll(async () => {
		await app.close();
	});

	test('GET should return 200', async () => {
		const { status } = await axios.get('http://localhost:5000', {
			validateStatus: null
		});
		expect(status).toBe(200);
	});
});
		`;

		const filePath = path.join(__dirname, `../test/integration/${i}.test.ts`);
		fs.writeFileSync(filePath, content);
		console.log(filePath);
	}
}

main();
