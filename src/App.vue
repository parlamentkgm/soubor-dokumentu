<template>
    <v-app>
        <v-app-bar dense app>
            <v-btn icon @click="back()" :disabled="backDisabled">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Soubor dokumentů</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <keep-alive include="Home">
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-content>
        <v-footer app max-height="70">
            <v-container fluid>
                <p class="caption text-center">
                    Studentský parlament KGM 2020, GPL-3.0 <br/>
                    Podpora: <a href="mailto:marek@mblazek.dev">marek@mblazek.dev</a>
                </p>
            </v-container>
        </v-footer>
    </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "app",
    methods: {
        back () {
            this.$router.go(-1);
        }
    },
    computed: {
        backDisabled () {
            return (this.$route.name === "Home") ? true : false;
        }
    }
})
</script>