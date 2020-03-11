<template>
  <v-container>
    <v-layout row wrap fluid v-if="items.length>0">
      <template v-for="(item, i) in items">
        <v-card :key="i" class="mx-auto" color="blue darken-2" width="300">
          <v-card-title>
            <v-icon large left>home</v-icon>
            <span class="title font-weight-bold text--blue">{{item.zydw}}</span>
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
          <v-card-text class="text--primary">
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img class="elevation-6" :src="item.avator_uri"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="text--blue--darken-4">{{item.name}}</v-list-tile-title>
                <v-list-tile-title>账号:{{item.username}} 密码:{{item.password}}</v-list-tile-title>
              </v-list-tile-content>
              
            </v-list-tile>
          </v-card-text>
          <v-card-actions>
             <v-spacer></v-spacer>
              <v-btn text v-if="!item.review" @click="reveal(item.ID)">
                审核
              </v-btn>
              <v-btn text @click="edit(item)">
                修改
              </v-btn>
              <v-btn text @click="remove(item.ID)">
                删除
              </v-btn>
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
                  <span class="headline">没有药师</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>
            <v-img :src="img" contain></v-img>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="dialog=!dialog">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog1" width="500">
        <v-card>
          <v-card-title class="headline amber lighten-2" primary-title>修改药师</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="ys.name" :counter="50"  label="姓名" required></v-text-field>
              <v-text-field v-model="ys.username" label="账号" required></v-text-field>
              <v-text-field v-model="ys.password" label="密码" required></v-text-field>
              <v-text-field v-model="ys.sfzh" label="身份证号" required></v-text-field>
              <v-text-field v-model="ys.zyzbm" label="执业证编码" required></v-text-field>
              <v-text-field v-model="ys.zgzbm" label="资格证编码" required></v-text-field>
              <v-text-field v-model="ys.mobile" label="手机" required></v-text-field>
              <v-text-field v-model="ys.zyzbm" label="执业证编码" required></v-text-field>
              <v-text-field v-model="ys.zydw" label="职业单位" required></v-text-field>
              <v-text-field v-model="ys.dept" label="所在科室" required></v-text-field>
              <v-file-input show-size label="执业证照片" v-model="ys.zyz_uri"></v-file-input>
              <v-file-input show-size label="资格证照片" v-model="ys.zgz_uri"></v-file-input>
              <v-file-input show-size label="头像" v-model="ys.avator_uri"></v-file-input>              
            </v-form>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="editSave">保存</v-btn>
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
    ys: null,
    snackbar: false,
    color: "black",
    mode: "",
    timeout: 3000,
    text: "",
    dialog: null,
    dialog1: null,
    img: ''
  }),
  mounted() {
    this.$axios.get("api/v1/yaoshis").then(res => {
      if (res.data.data) this.items = res.data.data;
    });
  },
  methods: {
    reveal(id) {
      this.$axios.get("/api/v1/yaoshi/eidtyaosrev?id=" + id).then(res => {
        if (res.data.code == 200) {
          this.text = "审核成功";
          this.snackbar = true;
          this.items.forEach(item => {
            if (item.ID == id) {
              this.items.pop(item);
            }
          });
        } else {
          this.color = "red";
          this.text = "审核未成功";
          this.snackbar = true;
        }
      });
    },
    edit(e){

    },
    remove(id){

    },
    show(src) {
      this.dialog = !this.dialog;
      this.img = src;
    }
  }
};
</script>