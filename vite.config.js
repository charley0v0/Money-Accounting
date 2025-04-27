import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('env',env.VITE_BASE); //輸出VITE_BASE的環境變數
  return{
    plugins: [vue()],
    base:env.VITE_BASE,
    build:{
      outDir:'../public',
      emptyOutDir:true,
      rollupOptions: {
        output:{
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: ((file) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(file.name ?? '')){
              
              return 'images/[name]-[hash][extname]';
            }
            
            if (/\.css$/.test(file.name ?? '')) {
              return 'css/[name]-[hash][extname]';   
            }
  
            if (/\.(woff2|woff|ttf|eot)$/.test(file.name ?? '')) {
              return 'font/[name][extname]';   
            }
  
            return '[name][extname]';
          }),
        }
      },
    }
  }
})
