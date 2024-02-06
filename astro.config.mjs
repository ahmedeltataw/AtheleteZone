import { defineConfig } from 'astro/config';
import purgecss from "astro-purgecss";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'assets/images',
    format: 'file',
    assetsPrefix: './'
  },
  image: {
    domains: ["astro.build"]
  },
  compressHTML: true,
  output: 'static',
  // to divide the file.ex in the folder named ex
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({
            name
          }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }

            // default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    }
  },
  integrations: [purgecss(), icon()]
});