import autoExternal from 'rollup-plugin-auto-external';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = [{
    input: 'src/index.ts',
    output: {
        'banner': '#!/usr/bin/env node',
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        autoExternal(),
        json(),
        typescript(),
        terser.default({
            format: {
                comments: false
            }
        })
    ]
}];

export default config;
