import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(({command, mode}) => {
  const isBuild = command === 'build';
  return {
    plugins: [react(), tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      cors: {
        origin: [
          /^https?:\/\/.*\.autocargapelusqui\.com$/,
          /^https?:\/\/autocargapelusqui\.com$/,
          /^https?:\/\/localhost(:\d+)?$/,
          /^https?:\/\/.*\.run\.app$/
        ],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'HEAD', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      },
      host: '0.0.0.0',
      port: 3000,
    },
    build: isBuild ? {
      // Configuramos Vite para compilar como una librería
      lib: {
        entry: 'src/main.tsx',
        name: 'AltraTitlebar',
        fileName: 'altra-titlebar',
        formats: ['es'] // Formato ES Module
      },
      rollupOptions: {
        // Aseguramos que las dependencias externas no se incluyan en el bundle si es necesario
        // external: ['react', 'react-dom'],
        // output: {
        //   globals: {
        //     react: 'React',
        //     'react-dom': 'ReactDOM'
        //   }
        // }
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode)
      }
    } : undefined
  };
});
