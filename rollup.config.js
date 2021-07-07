import {uglify} from 'rollup-plugin-uglify';

export default {
    input: './src/index.js',
    output: {
        file: './dist/web-tracker.min.js',
        name: 'webTracker',
        format: 'iife'
    },
    plugins:[
        uglify(),
    ]
}