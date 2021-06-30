import {uglify} from 'rollup-plugin-uglify';

export default {
    input: './src/index.js',
    output: {
        file: './dist/js-tracker.min.js',
        name: 'jsTracker',
        format: 'iife'
    },
    plugins:[
        uglify(),
    ]
}