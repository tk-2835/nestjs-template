import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
	test: {
		globals: true,
		isolate: false,
		coverage: {
			provider: 'v8',
			include: ['src/**/*']
		},

		minWorkers: 1,
		maxWorkers: 1
	}
});
