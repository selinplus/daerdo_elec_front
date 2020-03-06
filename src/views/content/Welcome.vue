<template>
  <v-container>
    <v-layout>
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline amber lighten-2" primary-title>设置平台名称</v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field v-model="mc" label="名称" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" @click="updmc">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-layout>
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
    mc: "",
    snackbar: false,
    color: "orange",
    mode: "",
    timeout: 3000,
    text: ""
  }),
  mounted() {
    this.mc = this.getMc();
  },
  methods: {
    ...mapMutations({
      addToken: "setToken",
      getUsername: "getUsername",
      getMc: "getMc",
      setMc: "setMc"
    }),
    updmc() {
      if (this.mc !== "") {
        this.$axios
          .post("/api/v1/yaodians/eidtmc", { mc: this.mc })
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
        this.text = "名称不能为空";
        this.snackbar = true;
        this.setMc(this.mc);
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