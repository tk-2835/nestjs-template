import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { NestApplication } from '@nestjs/core';
import axios from 'axios';

describe('Example', () => {
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
