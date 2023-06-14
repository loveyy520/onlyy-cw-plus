import { fileURLToPath, URL } from "node:url";
// import vue from 'rollup-plugin-vue';
import vue from "@vitejs/plugin-vue2";
import babel from 'rollup-plugin-babel';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: "src/index.js",
    output: [
        {
            dir: 'dist',
            // file: 'dist/index.common.js',
            chunkFileNames: "chunks/[name].[format].js",
            entryFileNames: "[name].[format].js",
            assetFileNames: "[ext]/[name]-[hash][extname]",
            format: 'cjs'
        },
        {
            dir: 'dist',
            // file: 'dist/index.common.js',
            chunkFileNames: "chunks/[name].[format].js",
            entryFileNames: "[name].js",
            assetFileNames: "[ext]/[name]-[hash][extname]",
            format: 'esm'
        },
        {
            dir: 'dist',
            // file: 'dist/index.common.js',
            chunkFileNames: "chunks/[name].[format].js",
            entryFileNames: "[name].[format].js",
            assetFileNames: "[ext]/[name]-[hash][extname]",
            format: 'umd',
            name: 'cwPlus'
        }
    ],
    maxParallelFileOps: 30,
    plugins: [
        vue({
            extensions: ['.vue']
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        alias({
            entries: {
                "~": fileURLToPath(new URL("./src", import.meta.url)),
                "@": fileURLToPath(new URL("./examples/src", import.meta.url))
            }
        }),
        // 配置文件拓展名解析
        resolve({
            extensions: [".mjs", ".js", ".jsx", ".json", ".vue"]
        })
    ]
    // external: ['vue'],

    // external,
    // plugins: [externalGlobals(externals)],
}