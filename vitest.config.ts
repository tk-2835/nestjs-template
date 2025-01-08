import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		isolate: false,
		coverage: {
			provider: 'v8',
			include: ['src/**/*']
		}
	}
});
