// import { defineConfig } from 'vite'

// export default defineConfig({
//   build: {
//     // lib: {
//     //   entry: './lib/main.js',
//     //   name: 'Counter',
//     //   fileName: 'counter',
//     // },
//       base: './'
//   },
// })
import { fileURLToPath, URL } from "node:url";
// import AutoImport from "unplugin-auto-import/vite";
import { defineConfig, loadEnv } from "vite";
// import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
// import autoprefixer from "autoprefixer";
// import postCssPxToRem from "postcss-pxtorem";
import ViteRestart from "vite-plugin-restart";
// import Components from 'unplugin-vue-components/vite'
// import { VantResolver } from '@vant/auto-import-resolver'
import path from "path";
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     ViteRestart({
//       restart: ['my.config.[jt]s'],
//     }),
//     // vueDevTools(),
//   ],
//   css: {
//     devSourcemap: true,
//     postcss: {
//       plugins: [
//         postCssPxToRem({
//           rootValue: 37.5,
//           propList: ['*'],
//         }),
//       ],
//     },
//   },

//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
// })
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname); // 根据 mode 来判断当前是何种环境
  console.log(env);
  console.log(import.meta.url);

  return {
    resolve: {
      alias: {
        // "@": fileURLToPath(new URL("./js", import.meta.url)),
          "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      // vueDevTools(),
      // vue(), // 默认配置vue插件
      // AutoImport({ imports: ['vue', 'vue-router'], resolvers: [VantResolver()] }), // 配置vue、vue-router的API自动加载
      ViteRestart({
        restart: ["my.config.[jt]s"],
      }),
      // Components({
      //   resolvers: [VantResolver()],
      // }),
    ],
    css: {
      devSourcemap: true,

      postcss: {
        // plugins: [
        //   postCssPxToRem({
        //     rootValue: 37.5,
        //     propList: ['*'],
        //     landscape: true, // 是否处理横屏情况
        //     landscapeWidth: 667, // (Number) 横屏时使用的视口宽度
        //   }),
        //   autoprefixer({
        //     overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        //   }),
        // ],
      },
      // preprocessorOptions: {
      //   scss: {
      //     api: 'modern-compiler',
      //   },
      // },
    },
    server: {
      hmr: {
        overlay: false,
      },
      host: "0.0.0.0", // 指定服务器应该监听哪个 IP 地址，默认localhost，可设置为'0.0.0.0'或 true
      // host: 'test.qq.com', // 指定服务器应该监听哪个 IP 地址，默认localhost，可设置为'0.0.0.0'或 true
      port: 8000, // 端口号，默认5173
      open: true, // 开发服务器启动时，自动在浏览器中打开应用程序
      // 本地代理
      proxy: {
        // 简写（字符串）
        "/mock": env.VITE_BASE_API,
        // 带选项写法（对象）
        "/api": {
          target: env.VITE_BASE_API, // 从环境变量文件取值
          changeOrigin: true, // 支持跨域
          rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        "/socket.io": {
          target: "ws://localhost:5174",
          // 支持 websocket
          ws: true,
        },
      },
    },
    build: {
      base: "./",
      outDir: "dist", // 默认dist（可省略），打包后输出文件
      assetsDir: "assets", // 默认assets（可省略），指定静态资源存放路径
      sourcemap: false, // 默认false（可省略），是否构建sourcemap文件（生产不需要）
      // minify: "terser", // 客户端默认构建是esbuild，需安装terser：`npm i -D terser`
      terserOptions: {
        // 生产环境移除console、debugger
        compress: {
          drop_console: true, // 默认false
          drop_debugger: true, // 默认true
        },
      },
      rollupOptions: {
        output: {
          // manualChunks(id) {
          //   if (id.includes("node_modules")) {
          //     return id
          //       .toString()
          //       .split("node_modules/")[1]
          //       .split("/")[0]
          //       .toString();
          //   }
          // },
          experimentalMinChunkSize: 10 * 1024,
        },
      },
    },
  };
});
