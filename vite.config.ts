import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020',
		},
	},
	esbuild: {
		// https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	base: '/joblist-allab-task/',
});
