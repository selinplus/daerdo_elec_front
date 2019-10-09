<template>
  <v-container id="keep">
    <v-navigation-drawer v-model="drawer" app fixed clipped class="blue">
      <v-list dense class="blue">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>
                <v-icon>flare</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" :to="item.path" @click="drawer = !drawer">
            <v-list-tile-action>
              <v-icon class="olive--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text subtitle-1 font-weight-bold">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5 white--text">
        Manager&nbsp;
        <span class="font-weight-light white--text">{{mc}}</span>
      </span>
      
      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon dark class="white--text" @click="dialog=!dialog">spellcheck</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon dark class="white--text" @click="logout">settings_power</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline amber lighten-2" primary-title>修改密码</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="pass1" :rules="rules" label="新密码" required></v-text-field>

              <v-text-field v-model="pass2" :rules="rules" label="确认新密码" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" @click="updpw">保存</v-btn>
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
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    mc:'',
    dialog: null,
    drawer: null,
    snackbar: false,
    color: "orange",
    mode: "",
    timeout: 3000,
    text: "",
    pass1: "",
    pass2: "",
    rules: [
      v => !!v || "内容必须填写",
      v => (v && v.length <= 100) || "不能超过50字"
    ],
    items: [
      { heading: "管理功能" },
      { icon: "lightbulb_outline", text: "首页", path: "/home/index" },
      { icon: "rate_review", text: "未审核医师", path: "/home/ysunreview" },
      { icon: "verified_user", text: "已审核医师", path: "/home/ysreview" },
      { icon: "rate_review", text: "未审核药师", path: "/home/yaosunreview" },
      { icon: "verified_user", text: "已审核药师", path: "/home/yaosreview" },
      { icon: "group_add", text: "增加药品", path: "/home/medicine" },
      { divider: true },
      { heading: "辅助功能" },
      { icon: "search", text: "处方单", path: "/home/cfd" },
      { divider: true },
      { icon: "add_shopping_cart", text: "药店信息", path: "/home/mendian" },
      { divider: true },
      { icon: "archive", text: "统计", path: "/home/statis" },
      { divider: true },
      { icon: "settings", text: "设置", path: "/home/settings" }
    ]
  }),
  props: {
    source: String
  },
  mounted(){
    this.mc = this.getMc()
  },
  methods: {
    ...mapMutations({
      addToken: "setToken",
      getUsername: "getUsername",
      getMc: "getMc"
    }),
    logout() {
      this.addToken("");
      this.$router.push("/");
    },
    updpw() {
      if ((this.pass1 == this.pass2) != "") {
        this.dialog = !this.dialog;
        this.$axios
          .post("/api/v1/yaodians/eidtpass", { id: 1, password: this.pass1 })
          .then(res => {
            if (res.data.code == 200) {
              this.text = "修改成功";
              this.snackbar = true;
            } else {
              this.text = "修改失败";
              this.snackbar = true;
            }
          });
      } else {
        this.text = "密码不一致";
        this.snackbar = true;
      }
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
