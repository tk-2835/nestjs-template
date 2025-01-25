/*
import { createJsWithTsPreset, JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
	...createJsWithTsPreset(),
	collectCoverage: true
};

export default config;
*/

export default {
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest'
	}
};
