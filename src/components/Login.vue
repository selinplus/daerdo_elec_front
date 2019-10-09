<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar class="primary">
                <v-toolbar-title class="white--text">{{mc}}电子处方管理端</v-toolbar-title>
                <v-spacer></v-spacer>                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    name="login"
                    label="用户名"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    v-model="password"
                    name="password"
                    label="密码"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="doLogin">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
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
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: null,
    username: "",
    password: "",
    snackbar: false,
    color: "",
    mode: "",
    timeout: 3000,
    text: "",
    mc: '',
  }),

  props: {
    source: String
  },
  mounted(){
    self = this;
     this.$axios.get("/yaodian").then(res => {
          if (res.data.data) self.mc = res.data.data.mc;
            self.addMc(self.mc)
        })
  },
  methods: {
    ...mapMutations({
      addToken: "setToken",
      addUsername: "setUsername",
      addMc: "setMc"
    }),
    doLogin() {
      if (this.username && this.password) {
        let self = this;
        this.axios
          .get(
            "/yaodian/auth" +
              "?username=" +
              this.username +
              "&password=" +
              this.password +
              "&version=1.0.0"
          )
          .then(res => {
            let data = res.data;
            if (data.code == 200) {
              self.addToken(data.data.token);
              self.addUsername(self.username);
              self.text = data.msg;
              self.snackbar = true;
              self.$router.push("home/index");
            } else {
              self.text = data.msg;
              self.snackbar = true;
            }
          });
      } else {
        this.text = "用户名密码未填写";
        this.snackbar = true;
      }
    }
  }
};
</script>