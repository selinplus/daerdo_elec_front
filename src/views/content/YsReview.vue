<template>
  <v-container>
    <v-layout row wrap fluid v-if="items.length>0">
      <template v-for="(item, i) in items">
        <v-card :key="i" class="mx-auto" color="amber darken-2" width="300">
          <v-card-title>
            <v-icon large left>home</v-icon>
            <span class="title font-weight-bold text--olive">{{item.zydw}}</span>
          </v-card-title>

          <v-card-text class="headline" style="height:100px;">"{{item.jianjie}}"</v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-img :src="item.zyz_uri" height="130px" contain @click="show(item.zyz_uri)"></v-img>
            </v-flex>
            <v-flex xs6>
              <v-img :src="item.zgz_uri" height="130px" contain @click="show(item.zgz_uri)"></v-img>
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
    <v-layout v-if="items.length==0">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">没有已审核的医师</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>
            <v-img :src="img" contain></v-img>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" @click="dialog=!dialog">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable */

export default {
  data: () => ({
    items: [],
    snackbar: false,
    color: "orange",
    mode: "",
    timeout: 3000,
    text: "",
    dialog: null,
    img: ''
  }),
  mounted() {
    this.$axios.get("/api/v1/yishi/yisrev").then(res => {
      if (res.data.data) this.items = res.data.data;
    });
  },
  methods: {
    reveal(id) {
      this.$axios.get("/api/v1/yishi/eidtyisrev?id=" + id).then(res => {
        if (res.data.code == 200) {
          this.text = "审核成功";
          this.snackbar = true;
        } else {
          this.color = "red";
          this.text = "审核未成功";
          this.snackbar = true;
        }
      });
    },
    show(src) {
      console.log(src);
      this.img = src;
      this.dialog = !this.dialog;
    }
  }
};
</script>