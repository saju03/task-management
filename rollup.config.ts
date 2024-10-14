import { nodeResolve } from '@rollup/plugin-node-resolve'; // To resolve node modules
import commonjs from '@rollup/plugin-commonjs'; // To convert CommonJS modules to ES6
import json from '@rollup/plugin-json'; // To support JSON imports
import babel from '@rollup/plugin-babel'; // For transpiling ES6+ code
import { terser } from 'rollup-plugin-terser'; // To minify the code

export default {
  input: 'backend/dist/index.js',
  output: {
    file: 'backend/build/bundle.js',
    format: 'esm', // or 'cjs', depending on your needs
    sourcemap: true,
  },
  plugins: [
    json(),
    commonjs(),
    nodeResolve(), // Resolve node modules
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
  treeshake: {
    moduleSideEffects: false, // Helps with tree shaking
  },
  external: ['aws-sdk', 'nock', 'mock-aws-s3'], // Include any other external dependencies
};
