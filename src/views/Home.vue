<template>
  <v-app id="keep">
    <v-navigation-drawer v-model="drawer" fixed clipped class="amber" app>
      <v-list dense class="amber">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text--darken-4 white--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        Manager&nbsp;
        <span class="font-weight-light">Keeper</span>
      </span>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    drawer: null,
    snackbar: false,
    color: "",
    mode: "",
    timeout: 3000,
    text: "",
    items: [
      { icon: "lightbulb_outline", text: "首页", path: "/home/index" },
      { icon: "touch_app", text: "未审核", path: "/home/unreview" },
      { icon: "touch_app", text: "已审核", path: "/home/review" },
      { divider: true },
      { heading: "Labels" },
      { icon: "search", text: "查询", path: "/home/query" },
      { divider: true },
      { icon: "archive", text: "统计", path: "/home/statis" },
      { divider: true },
      { icon: "settings", text: "设置", path: "/home/settings" }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    navaigator: function(i) {
      this.text = this.$token;
      this.snackbar = true;
      console.log(i);
      this.$router.push("yishi");
    }
  }
};
</script>

<style lang="stylus">
#keep {
  .v-navigation-drawer__border {
    display: none;
  }
}
</style>
