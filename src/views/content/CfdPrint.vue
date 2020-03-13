<template>
  <v-container id="create">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline lighten-2" primary-title>处方单</v-card-title>
          <div id="myImg">
            <v-img aspect-ratio max-width="350" max-height="700" :src="src"></v-img>
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="prt">打印</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-container fluid>
      <v-card align-center justify-center>
        <v-overflow-btn
          class="my-2"
          :items="items"
          label=".输入查询"
          editable
          item-value="text"
          v-model="mendian"
        ></v-overflow-btn>
        <v-layout row wrap>
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
                  v-model="begtime"
                  label="起始日期"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="begtime" @input="menu1 = false"></v-date-picker>
          </v-menu>
          <v-menu
              v-model="menu2"
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
                  v-model="endtime"
                  label="结束日期"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="endtime" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-btn class="ma-2" tile color="blue" :disabled="!mendian" dark @click="querycf">查询</v-btn>
          <v-btn
            class="ma-2"
            tile
            color="indigo"
            :disabled="!desserts.length"
            dark
            @click="downcf"
          >下载</v-btn>
        </v-layout>
        
      </v-card>
      <v-spacer></v-spacer>
    </v-container>
    <template>
      <v-progress-linear :indeterminate="true" v-if="progress"></v-progress-linear>
    </template>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      item-key="ID"
    >
      <template v-slot:headers="props">
        <tr class="blue">
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            class="white--text"
            @click="changeSort(header.value)"
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
          <td class="text-xs-right">{{ props.item.mendian_name }}</td>
          <td class="text-xs-right">{{ props.item.cfkjsj }}</td>
          <td class="text-xs-right">{{ props.item.patient_name }}</td>
          <td class="text-xs-right">{{ props.item.yishi_name }}</td>
          <td class="text-xs-right">{{ props.item.bzms }}</td>
          <td class>
            <v-btn @click="show(props.item.cfduri)">
              <v-icon small>print</v-icon>
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
import printJs from "print-js";
export default {
  data: () => ({
    progress: true,
    condition: null,
    fab: false,
    dialog: false,
    snackbar: false,
    menu1:false,
    menu2:false,
    color: "black",
    timeout: 3000,
    text: "",
    begtime: new Date().toISOString().substr(0, 10),
    endtime: new Date().toISOString().substr(0, 10),
    src: "",
    pagination: {
      sortBy: "ID"
    },
    mendian: "",
    items: [],
    selected: [],
    headers: [
      {
        text: "ID",
        align: "left",
        value: "id"
      },
      { text: "药店名称", value: "mendian_name" },
      { text: "开具时间", value: "cfkjsj" },
      { text: "病人姓名", value: "patient_name" },
      { text: "医师", value: "yishi_name" },
      { text: "病症描述", value: "bzms" },
      { text: "操作", value: "" }
    ],
    desserts: []
  }),
  mounted() {
    this.$axios.get("/api/v1/mendian/mclist").then(res => {
      if (res.data.data) this.items = res.data.data;
      this.progress = false;
    });
  },
  watch: {},
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
      this.src = uri;
      this.dialog = !this.dialog;
    },
    querycf: function(val) {
      if (val != "") {
        this.progress = true;
        this.$axios
          .get(
            "/api/v1/presuribymonth?mc=" +
              this.mendian +
              "&begtime=" +
              this.begtime +
              "&endtime=" +
              this.endtime
          )
          .then(res => {
            if (res.data.data) this.desserts = res.data.data;
            this.progress = false;
          })
          .catch(() => {
            this.progress = false;
          });
      }
    },
    downcf: function() {
      this.text = "准备数据...";
      this.progress = true;
      this.$axios
        .get(
          "/api/v1/downloadcf?mc=" +
            this.mendian +
            "&begtime=" +
            this.begtime +
            "&endtime=" +
            this.endtime
        )
        .then(res => {
          if (res.data.data) {
            var src = window.location.protocol + "//" + window.location.host + "/export/" + res.data.data;
            var iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = src;
            document.getElementsByTagName("body")[0].appendChild(iframe);
          }
          this.progress = false;
        });
    },
    filterMendian() {},
    prt() {
      printJs({
        printable: this.src,
        type: "image",
        imageStyle: "margin-top:30px;height:600px;"
      });
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