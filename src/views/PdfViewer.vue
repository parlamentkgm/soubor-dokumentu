<template>
  <div>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-alert type="error" :value="errorLoading">Nepodařilo se načíst dokument.</v-alert>
    <v-container fluid v-if="blobUrl">
        <v-toolbar flat dense dark>
            <v-toolbar-title>Prohlížení souboru PDF</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-on:click="openNewWindow()">
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon :href="blobUrl" download>
                <v-icon>mdi-file-download</v-icon>
            </v-btn>
        </v-toolbar>
        <embed :src="blobUrl" type="application/pdf" v-if="blobUrl" />
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PdfViewer",
  data() {
    return {
      loading: false,
      errorLoading: false,

      blobUrl: <string|null>null
    };
  },
  mounted() {
    this.loading = true;
    var req = new XMLHttpRequest();
    let doc = decodeURI(this.$route.params.doc);
    req.open("GET", doc, true);
    req.responseType = "arraybuffer";
    req.send();
    req.onload = () => {
      const file = new Blob([req.response], { type: "application/pdf" });
      this.blobUrl = URL.createObjectURL(file);
      this.loading = false;
    };
    req.onerror = () => {
        console.error(req.response);
        this.loading = false;
        this.errorLoading = true;
    }
  },
  methods: {
      openNewWindow () {
          if (this.blobUrl) {
              window.open(this.blobUrl, "_blank");
          }
      }
  }
});
</script>

<style>
embed {
    width: 100%;
    height: calc(100vh - 220px);
}
</style>