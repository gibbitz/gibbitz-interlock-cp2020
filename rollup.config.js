import resolve from '@rollup/plugin-node-resolve';
import { string } from "rollup-plugin-string";
import { SYSTEM_PROJECT_NAME } from './src/module/constants/system.js'

const isProd = process.env.NODE_ENV === 'production';

export default (async () => ({
  input: `src/module/${SYSTEM_PROJECT_NAME}.mjs`,
	plugins: [
		resolve(),
    string({
      include: '**/**.hbs'
    }),
		isProd && (await import('@rollup/plugin-terser')).default()
	],
	output: {
    file: `dist/${SYSTEM_PROJECT_NAME}/system.mjs`,
    sourcemap: isProd ? false : 'inline',
		format: 'esm'
	}
}))();