<template>
  <v-container>
    <v-layout row wrap fluid v-if="items.length>0">
      
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.zydw"></v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>{{card.jianjie}}</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
                  <span class="headline">没有已审核的药师</span>
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
  </v-container>
</template>

<script>
/* eslint-disable */

export default {
  data: () => ({
    items: [],
    dialog: null,
    img: ''
  }),
  mounted() {
    this.$axios.get("/api/v1/yaoshi/yaosrev").then(res => {
      if (res.data.data) this.items = res.data.data;
    });
  },
  methods: {
    reveal(id) {},
    show(src) {
      this.img = src;
      this.dialog = !this.dialog;
    }
  }
};
</script>