<template>
  <v-container>
    <template v-for="(item, i) in items">
      <v-card :key="i" class="mx-auto" color="orange" dark max-width="400">
        <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">{{item.name}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">"{{item.jianjie}}"</v-card-text>

        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" :src="item.avator_uri"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
            </v-list-tile-content>

            <v-layout align-center justify-end>
              <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2">256</span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">mdi-share-variant</v-icon>
              <span class="subheading">45</span>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  mounted() {
    this.$axios.get("/api/v1/yishis").then(res => {
      this.items = res.data.data;
    });
  }
};
</script>