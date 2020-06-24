import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import PdfViewer from "@/views/PdfViewer.vue"

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/pdfViewer/:doc",
    name: "PdfViewer",
    component: PdfViewer
  }
]

const router = new VueRouter({
  routes
})

export default router
