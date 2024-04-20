import resolve from '@rollup/plugin-node-resolve';
import { string } from "rollup-plugin-string";
import { SYSTEM_NAME } from './src/constants/system.js'

const isProd = process.env.NODE_ENV === 'production';

export default (async () => ({
  input: `src/module/${SYSTEM_NAME}.js`,
	plugins: [
		resolve(),
    string({
      include: '**/**.hbs'
    }),
		isProd && (await import('@rollup/plugin-terser')).default()
	],
	output: {
    file: `dist/${SYSTEM_NAME}/${SYSTEM_NAME}.js`,
    sourcemap: isProd ? false : 'inline',
		format: 'esm'
	}
}))();