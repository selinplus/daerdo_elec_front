<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>医药连锁公司</span>
        <span class="font-weight-light">管理端</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://ytkeno.top:8080" target="_blank">
        <span class="mr-2">Ver 1.0.0</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import Login from "./components/Login";
export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      //
    };
  }
};
</script>
