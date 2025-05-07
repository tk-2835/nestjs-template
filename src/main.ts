import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
	const app = await NestFactory.create(AppModule);

	SwaggerModule.setup(
		'swagger',
		app,
		SwaggerModule.createDocument(app, new DocumentBuilder().build())
	);

	await app.listen(process.env.PORT ?? 5000);
}

main();
