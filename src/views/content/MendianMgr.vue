<template>
  <v-container id="create">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline lighten-2" primary-title>药店信息</v-card-title>
          <v-card-text>            
              <v-text-field label="名称" v-model="md.mc"></v-text-field>
              <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="md.expired_at"
                      label="有效日期"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="md.expired_at" @input="menu1 = false"></v-date-picker>
              </v-menu>     
              <v-text-field label="负责人" v-model="md.fzr"></v-text-field>
              <v-text-field label="电话" v-model="md.dianhua"></v-text-field>
              <v-text-field label="帐号" v-model="md.username"></v-text-field>
              <v-text-field label="密码" v-model="md.password"></v-text-field>
              <v-text-field label="版本" v-model="md.version"></v-text-field>
              <!-- <v-text-field label="有效期" v-model="md.expired_at"></v-text-field> -->
                 
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save">
              <v-icon small>save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      item-key="ID"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              orange
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            color="orange"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.ID }}</td>
          <td class="text-xs-right">{{ props.item.mc }}</td>
          <td class="text-xs-right">{{ props.item.fzr }}</td>
          <td class="text-xs-right">{{ props.item.dianhua }}</td>
          <td class="text-xs-right">{{ props.item.username }}</td>
          <td class="text-xs-right">{{ props.item.password }}</td>
          <td class="text-xs-right">{{ props.item.version }}</td>
          <td class="text-xs-right">{{ props.item.expired_at }}</td>
          <td class>
            <v-btn @click="show(props.item.ID)">
              <v-icon small>edit</v-icon>
            </v-btn>
          </td>
          
        </tr>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    condition: null,
    fab: false,
    dialog: false,
    snackbar: false,
    color: "black",
    timeout: 3000,
    item: null,
    menu1:false,
    text: "",
    src: "",
    md: {},
    pagination: {
      sortBy: "ID"
    },
    selected: [],
    headers: [
      {
        text: "ID",
        align: "left",
        value: "id"
      },
      { text: "药店名称", value: "mc" },
      { text: "负责人", value: "fzr" },
      { text: "电话", value: "dianhua" },
      { text: "帐号", value: "username" },
      { text: "密码", value: "password" },
      { text: "版本", value: "version" },
      { text: "操作", value: "ID" },
      { text: "有效期", value: "expired_at" }
    ],
    desserts: []
  }),
  mounted() {
    this.$axios.get("/api/v1/yaodian").then(res => {
      if (res.data.data) this.desserts = res.data.data;
    });
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    toggle() {},
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    show(idd) {
      this.desserts.forEach(i => {
        if (i.ID === idd) {
          //eslint-disable-next-line
          console.log("ID=" + idd);
          this.md = i;
        }
      });
      this.dialog = !this.dialog;
    },
    expired(idd, yxbz) {
      if (yxbz === 1){
        yxbz = 0
      }else{
        yxbz = 1
      }
      this.$axios
        .post("api/v1/mendian/yxbz", {
          id: idd,
          yxbz: yxbz
        })
        .then(res => {
          if (res.data.code == 200) {
            this.text = "修改有效状态成功";
            this.snackbar = true;
            this.desserts.forEach(i => {
              if (i.ID === idd) {
                i.yxbz = yxbz;
              }
            });
          } else {
            this.text = "修改有效状态失败";
            this.snackbar = true;
          }
        });
    },
    save() {
      this.$axios
        .post("api/v1/upd/mdinfo", {
          id: this.md.ID,
          mc: this.md.mc,
          fzr: this.md.fzr,
          dianhua: this.md.dianhua,
          username: this.md.username,
          password: this.md.password,
          version: this.md.version,
          expired_at:this.md.expired_at,
        })
        .then(res => {
          if (res.data.code == 200) {
            this.text = "修改" + this.md.mc + "成功";
            this.snackbar = true;
            this.dialog = !this.dialog;
          } else {
            this.text = "修改" + this.md.mc + "失败";
            this.snackbar = true;
          }
        });
    }
  }
};
</script>
<style>
/* This is for documentation pures and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>