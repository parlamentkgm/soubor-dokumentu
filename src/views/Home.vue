<template>
  <div>
    <h1 class="headline text-center">Vyhledávání v Souboru dokumentů</h1>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-alert type="error" :value="errorLoading">
      Nepodařilo se načíst seznam dokumentů.
    </v-alert>
    <div id="content" v-if="documents">
      <v-radio-group v-model="findBy" :mandatory="true">
        <v-radio label="Vyhledávání podle čísla rezoluce" value="resolutionNumber"></v-radio>
        <v-radio
          label="Vyhledávání podle čísla jednacího (návrhy rezolucí, záznamy schůzí, dokumenty neuvedené v §9 odst. 1 Jednacího řádu)"
          value="referenceNumber"
        ></v-radio>
        <v-radio label="Vyhledávání podle názvu" value="title"></v-radio>
      </v-radio-group>
      <v-container v-if="findBy === 'resolutionNumber'">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Číslo" type="number" outlined v-model="resNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Ročník" type="number" outlined v-model="resYear"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="findBy === 'referenceNumber'">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Ročník" type="number" outlined v-model="otherYear"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Číslo" type="number" outlined v-model="otherNumber"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="findBy === 'title'">
        <v-row>
          <v-col cols="12" xs="12">
            <v-text-field label="Název" outlined v-model="title"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-btn outlined color="primary" :disabled="!findBy" @click="find">Hledat</v-btn>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col xs="12">
            <v-data-table
              :headers="headers"
              :items="filteredDocuments"
              class="elevation-1"
              v-if="filteredDocuments"
            >
              <template v-slot:item.fullRef="{item}">
                <span v-if="item.type == 'resolution'">{{item.number}}/{{item.year}}</span>
                <span v-if="item.type == 'other'">SP-{{item.year}}-{{item.number}}</span>
              </template>
              <template v-slot:item.options="{item}">
                <v-btn icon @click="showPdf(item)">
                  <v-icon>mdi-file-document</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
      <div id="embed"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {ASBDocument} from "@/model/ASBDocument";
import * as rm from "typed-rest-client";
// @ts-ignore
import stripAccented from "strip-accented";
export default Vue.extend({
  name: "Home",
  data() {
    return {
      findBy: <string|null>null,
      resNumber: null,
      resYear: null,
      otherNumber: null,
      otherYear: null,
      title: "",

      documents: <ASBDocument[]|null>null,
      loading: false,
      errorLoading: false,

      filteredDocuments: <ASBDocument[]|null>null,

      headers: [
        {text: "Číslo / č. j.", value: "fullRef"},
        {text: "Název", value: "title"},
        {text: "Možnosti", value: "options"}
      ]
    };
  },
  async mounted () {
    this.loading = true;
    const loc:any = `${location.protocol}//${location.host}/`;
    const rest: rm.RestClient = new rm.RestClient("soubor-dokumentu", loc);
    console.log("fetching from " + loc);
    try {
      const res: rm.IRestResponse<ASBDocument[]> = await rest.get("/list.json");
      if (res.statusCode === 200) this.documents = res.result;
      else throw new Error("REST client responded with code " + res.statusCode);
    } catch (e) {
      console.error(e);
      this.errorLoading = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    find () {
      if (this.documents) {
        switch (this.findBy) {
          case "resolutionNumber":
            this.filteredDocuments = this.documents.filter(d => d.type == "resolution"  && d.number == this.resNumber && d.year == this.resYear);
            break;
          case "referenceNumber":
            this.filteredDocuments = this.documents.filter(d => d.type == "other"  && d.number == this.otherNumber && d.year == this.otherYear);
            break;
          case "title":
            this.filteredDocuments = this.documents.filter(d => stripAccented(d.title.toLowerCase()).includes(stripAccented(this.title.toLowerCase())))
        }
      }
    },
    showPdf(doc:ASBDocument) {
      window.location.href = doc.file;
    }
  }
});
</script>
<style>
#content {
  max-width: 800px;
  margin: 0px auto;
}
</style>