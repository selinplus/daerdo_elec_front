<template>
  <v-container id="create">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline amber lighten-2" primary-title>处方單</v-card-title>
          <v-img id="myImg" contain :src="require('src')" aspect-ratio = "1"></v-img>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" v-print="'#myImg'">打印</v-btn>
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
          <td class="text-xs-right">{{ props.item.cfkjsj }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.yishi_name }}</td>
          <td class="text-xs-right">{{ props.item.bzms }}</td>
          <td class=""><v-btn @click="show(props.item.cfduri)"><v-icon small>print</v-icon></v-btn></td>
        </tr>
      </template>
    </v-data-table>
    <v-speed-dial
      v-model="fab"
      bottom
      left
      direction="right"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">close</v-icon>
          <v-icon v-else>account_circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="dialog=!dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
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
    color: "orange",
    timeout: 3000,
    text: "",
    mc: null,
    style: null,
    unit: null,
    source: null,
    src: null,
    rules: [
      v => !!v || "内容必须填写",
      v => (v && v.length <= 100) || "不能超过50字"
    ],
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
      { text: "开具时间", value: "cfkjsj" },
      { text: "病人姓名", value: "name" },
      { text: "医师", value: "yishi_name" },
      { text: "病症描述", value: "bzms" },
    ],
    desserts: []
  }),

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
    show(uri) {
      this.src = uri
      this.dialog = !this.dialog
    }
  }
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>