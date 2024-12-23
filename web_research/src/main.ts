//import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue'
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import router from './router/index.ts';

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

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
