import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import cs from "vuetify/src/locale/cs"

export default new Vuetify({
    lang: {
        locales: {cs},
        current: "cs"
    }
});
