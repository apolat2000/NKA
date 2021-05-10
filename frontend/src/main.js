import Vue from 'vue';

import VueMeta from 'vue-meta';

import App from './App.vue'

import 'semantic-ui-css/semantic.css';
import router from './Router'

import { Inkline } from '@inkline/inkline/src';
import * as components from '@inkline/inkline/src/components';
import '@inkline/inkline/src/inkline.scss';

Vue.use(VueMeta);

Vue.use(Inkline, {
    components,
    config: {
        variant: 'light',
        validation: {
            validateOn: ['input']      
        }
    }
});



new Vue({
  router,
  render: h => h(App),
}).$mount('#app');