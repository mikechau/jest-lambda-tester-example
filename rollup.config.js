import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

export default {
  format: 'cjs',

  sourceMap: false,

  external: [
    'aws-sdk'
  ],

  plugins: [
    resolve({
      main: true,
      jsnext: true
    }),

    commonjs(),

    babel({
      exclude: `${__dirname}/node_modules/**`,
      runtimeHelpers: true
    }),

    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),

    uglify({
      compress: {
        screw_ie8: true,
        warnings: false,
        unsafe: true,
        unsafe_comps: true,
        pure_getters: true
      },
      mange: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true
      }
    })
  ]
};
