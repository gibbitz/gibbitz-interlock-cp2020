import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { string } from "rollup-plugin-string";
import { SYSTEM_PROJECT_NAME } from './src/module/constants/system.js'
import path from 'path'
import { fileURLToPath } from 'url'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url))
)

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.json', '.scss', '.css']
})

export default (async () => ({
  input: `src/module/${SYSTEM_PROJECT_NAME}.mjs`,
	plugins: [
    alias({
      entries: {
        '@utils': path.resolve(rootDir, 'src/module/utils'),
        '@constants': path.resolve(rootDir, 'src/module/constants'),
        '@sheets': path.resolve(rootDir, 'src/module/sheets'),
        '@actorListeners': path.resolve(rootDir, 'src/module/sheets/listeners/actor'),
        '@itemListeners': path.resolve(rootDir, 'src/module/sheets/listeners/item'),
        '@templates': path.resolve(rootDir, 'src/templates'),
        '@documents': path.resolve(rootDir, 'src/module/documents'),
        '@models': path.resolve(rootDir, 'src/module/data'),
        '@effects': path.resolve(rootDir, 'src/module/effects'),
        '@packs': path.resolve(rootDir, 'src/packs'),
        '@data': path.resolve(rootDir, 'src/data'),
        '@assets': path.resolve(rootDir, 'src/assets'),
      },
      customResolver
    }),
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