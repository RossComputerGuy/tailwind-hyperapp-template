import copy from 'rollup-plugin-copy-enhanced';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import tailwind from 'tailwindcss';
import { defineBuildConfig } from 'unbuild';

const env = process.env.NODE_ENV ?? 'dev';

export default defineBuildConfig([
  {
    entries: ['./src/server'],
    declaration: true,
    sourcemap: true,
    rollup: {
      inlineDependencies: true,
      allowSyntheticDefaultImports: true,
      esbuild: {
        minify: true,
      },
      emitCJS: true,
    },
  },
  // FIXME: figure out why require() is being used on the web
  {
    entries: ['./src/client'],
    declaration: true,
    sourcemap: true,
    rollup: {
      inlineDependencies: true,
      allowSyntheticDefaultImports: true,
      output: {
        inlineDynamicImports: true,
      },
      replace: {
        'process.env.NODE_ENV': `"${env}"`,
      },
      resolve: {
        browser: true,
        main: true,
        preferBuiltins: false,
      },
      commonjs: {
        transformMixedEsModules: true,
        include: 'node_modules/**',
      },
      esbuild: {
        minify: true,
      },
      emitCJS: true,
    },
    hooks: {
      'rollup:options'(_, options) {
        options.plugins = [
          copy([
            'src/views/**/*.ejs'
          ], {
            minify: true,
          }),
          postcss({
            extract: 'styles.css',
            plugins: [
              tailwind(),
            ],
          }),
          globals(),
          builtins(),
          ...options.plugins,
          babel({ babelHelpers: 'bundled' }),
        ];
      },
    },
  },
]);
