import {fileURLToPath, URL} from "node:url";
import vue from "@vitejs/plugin-vue2";
import eslint from "vite-plugin-eslint";
import {defineConfig} from "vite";

const base = './'
// const base = '/t/auto-ops/static/dist'
// const base = "/o/auto-ops_saas/static/dist";
// devServer常用配置
// host
const host = "localhost";
// proxy

const baseConfig = {
    resolve: {
        alias: {
            "~": fileURLToPath(new URL("./src", import.meta.url)),
            "@": fileURLToPath(new URL("./examples/src", import.meta.url)),
            path: "path-browserify",
        },
        extensions: [".mjs", ".js", ".jsx", ".json", ".vue"],
    },
    assetsInclude: [
        "**/*.gltf",
        "png",
        "**/*.jpe?g",
        "**/*.jfif",
        "**/*.pjpeg",
        "**/*.pjp",
        "**/*.gif",
        "**/*.svg",
        "**/*.ico",
        "**/*.webp",
        "**/*.avif",
    ],
    commonjsOptions: {
        esmExternals: true,
    }
};

const basePlugins = [
    vue(),
    // https://github.com/gxmari007/vite-plugin-eslint
    {
        ...eslint({
            failOnWarning: false,
            failOnError: true,
            fix: true,
        }),
        enforce: "pre",
        apply: 'dev'
    }
];

// devServer
const devConfig = {
    server: {
        host,
        // host: "localhost",
        port: 8080,
        open: true,
        hmr: true
    }
};

// const external = Reflect.ownKeys(externals);

// prod环境下得build配置
const buildOpts = {
    target: "es2015",
    outDir: "static",
    assetsInlineLimit: 1024,
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
        input: "index-prod.html",
        maxParallelFileOps: 30,
        output: {
            dir: "static/dist/",
            chunkFileNames: "js/[name]-[hash].[format].js",
            entryFileNames: "js/[name]-[hash].js",
            assetFileNames: "[ext]/[name]-[hash][extname]",
            compact: true,
            manualChunks: {
                vue: ["vue"],
                "@canway/cw-magic-vue": ["@canway/cw-magic-vue"],
            },
        }
        // external,
        // plugins: [externalGlobals(externals)],
    }
};

// prod配置
const prodConfig = {
    base,
    build: buildOpts,
};

export default defineConfig(({command, mode}) => {
    if (mode === "development") {
        return {
            // dev 独有配置
            ...baseConfig,
            plugins: basePlugins,
            ...devConfig,
        };
    } else {
        return {
            // build 独有配置
            ...baseConfig,
            plugins: basePlugins,
            ...prodConfig,
        };
    }
});
