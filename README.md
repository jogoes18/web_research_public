# web_research_public
## Creación proyecto
npm create vite@latest web_research -- --template vue-ts
cd web_research
npm install
npm run dev

## Instalar router
npm install vue-router@4

## Instalar vuetify
npm i vuetify
npm install vite-plugin-vuetify --save-dev

En vite-env.d.ts añadir:
declare module 'vuetify/styles' 

En vite.config.ts:

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    vuetify({autoImport: true}),
  ],

})

En main.ts añadir:
import 'vuetify/styles';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',       // Establece el tema predeterminado
    themes: {
      light: {
        colors: {
          primary: '#005196',    // Azul personalizado
          secondary: '#FFCDD2',  // Color secundario claro (anteriormente colors.red.lighten4)
          accent: '#3F51B5',     // Color de acento (anteriormente colors.indigo.base)
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',  // Usa MDI como el conjunto de íconos por defecto
  },
});

app.use(vuetify);

## Instalar axios
npm install axios

