<template>
  <v-container>
    <v-layout row wrap fluid>
    <template v-for="(item, i) in items">
      <v-card :key="i" class="mx-auto" color="amber darken-2" width="350">
        <v-card-title>
          <v-icon large left>home</v-icon>
          <span class="title font-weight-bold text--olive">{{item.zydw}}</span>
        </v-card-title>

        <v-card-text class="headline" style="height:100px;">"{{item.jianjie}}"</v-card-text>
        <v-layout>
          <v-flex xs6>
            <v-img
              :src="item.zyz_uri"
              height="130px"
              contain
            ></v-img>
          </v-flex>
          <v-flex xs6>
            <v-img
              :src="item.zgz_uri"
              height="130px"
              contain
            ></v-img>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" :src="item.avator_uri"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="text--orange--darken-4">{{item.name}}</v-list-tile-title>
            </v-list-tile-content>

            <v-layout v-show="!item.review" align-center justify-end>
              <v-btn flat icon color="green-darken">
                <v-icon @click="reveal(item.ID)">thumb_up</v-icon>
              </v-btn>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
        <v-spacer color="white"></v-spacer>
      </v-card>
    </template>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */ 
export default {
  data: () => ({
    items: []
  }),
  mounted() {
    this.$axios.get("/api/v1/yishi/yisrev").then(res => {
      this.items = res.data.data;
    });
  },
  methods:{
    reveal(id){
      console.log(id);
    }
  }
};
</script>