<template>
  <v-container>
    <v-layout>
      <v-card class="mx-auto" min-width="500px" outlined>
        <v-card-title class="headline blue lighten-2" primary-title>增加中药材</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="mc" label="名称" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="updmc">保存</v-btn>
        </v-card-actions>
      </v-card>
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
export default {
  data: () => ({
    mc: "",
    snackbar: false,
    color: "orange",
    mode: "",
    timeout: 3000,
    text: ""
  }),
  methods: {    
    updmc() {
      if (this.mc !== "") {
        this.$axios
          .post("/api/v1/materiamedica/addmd", { mc: this.mc })
          .then(res => {
            if (res.data.code == 200) {
              this.text = "增加" + this.mc + "成功";
              this.snackbar = true;
              this.mc = ""
            } else {
              this.text = "增加失败";
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