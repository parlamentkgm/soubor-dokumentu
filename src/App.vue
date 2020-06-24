<template>
    <v-app>
        <v-app-bar dense app>
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