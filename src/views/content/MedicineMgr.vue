<template>
  <v-container id="create">
    <v-layout row flex>
      <v-flex xs6 sm6 md6 lg6>
        <v-text-field show-size label="批量导入药品" type="file" name="file" v-model="file"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 lg2>
        <v-btn flat icon color="deep-blue" :disabled="file==null" @click="uploadFile">
          导入
        </v-btn>
      </v-flex>
      <v-flex xs2 sm2 md2 lg2>
        <v-btn flat icon color="deep-blue" @click="download">
          下载模板
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row flex>
      <v-flex xs8 sm8 md8 lg8>
        <v-text-field label="输入拼音/汉字查询" outlined  clearable v-model="condition"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2 lg2>
        <v-btn flat icon color="deep-blue" @click="query">
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline amber lighten-2" primary-title>Med Add</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="mc" :counter="50" :rules="rules" label="名称" required></v-text-field>

              <v-text-field v-model="style" :rules="rules" label="规格" required></v-text-field>

              <v-text-field v-model="unit" :rules="rules" label="单位" required></v-text-field>

              <v-text-field v-model="source" :rules="rules" label="产地" required></v-text-field>
              <v-btn color="error" flat @click="reset">清空</v-btn>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog1" width="500">
        <v-card>
          <v-card-title class="headline amber lighten-2" primary-title>修改药品</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field v-model="med.mc" :counter="50" :rules="rules" label="名称" required></v-text-field>

              <v-text-field v-model="med.style" :rules="rules" label="规格" required></v-text-field>

              <v-text-field v-model="med.unit" :rules="rules" label="单位" required></v-text-field>

              <v-text-field v-model="med.source" :rules="rules" label="产地" required></v-text-field>
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
          <td class="text-xs-right">{{ props.item.style }}</td>
          <td class="text-xs-right">{{ props.item.unit }}</td>
          <td class="text-xs-right">{{ props.item.source }}</td>
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
      <v-btn fab dark small color="green" @click="editMed">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="dialog=!dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="delMed">
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
    dialog1: false,
    snackbar: false,
    color: "primary",
    timeout: 3000,
    text: "",
    file: null,
    med:{},
    mc: null,
    style: null,
    unit: null,
    source: null,

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
      { text: "名称", value: "mc" },
      { text: "规格", value: "style" },
      { text: "单位", value: "unit" },
      { text: "产地", value: "source" }
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
    query() {
      if (this.condition.length) {
        this.$axios.get("api/v1/medicine/py?py=" + this.condition).then(res => {
          if (res.data.data) this.desserts = res.data.data;
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    uploadFile(){
        // eslint-disable-next-line no-console
        console.log(this.file)
        let param = new FormData(); //创建form对象
        param.append('file',this.file);//通过append向form对象添加数据
        // eslint-disable-next-line no-console
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$axios.post('api/v1/medicine/impmd',param,config)
          .then(res=>{
             if (res.data.code == 200) {
              this.text = "导入" + this.file + "成功";
              this.snackbar = true;
              this.$refs.form.reset();
            } else {
              this.text = "导入" + this.file + "失败";
              this.snackbar = true;
            }
          })
    },
    download(){
      var src = window.location.protocol + "//" + window.location.host + "/export/medicine.xlsx";
      var iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = src;
      document.getElementsByTagName("body")[0].appendChild(iframe);
    },
    save() {
      if (this.mc && this.unit && this.style && this.source) {
        this.$axios
          .post("api/v1/medicine/addmd", {          
            mc: this.mc,
            style: this.style,
            source: this.source,
            unit: this.unit
          })
          .then(res => {
            if (res.data.code == 200) {
              this.text = "添加" + this.mc + "成功";
              this.snackbar = true;
              this.$refs.form.reset();
            } else {
              this.text = "添加" + this.mc + "失败";
              this.snackbar = true;
            }
          });
      }
    },
    editMed(){//打开修改药品窗口
        if (this.selected.length !== 1){
            this.text = "请选择修改的药";
            this.snackbar = true;
        }else{
            this.med = this.selected[0]
            this.dialog1 = ! this.dialog1
        }
    },
    editSave(){//修改药品
      if (this.med.mc && this.med.unit && this.med.style && this.med.source) {
        this.$axios
          .post("api/v1/medicine/editmd", {
            id: this.med.id,
            mc: this.med.mc,
            style: this.med.style,
            source: this.med.source,
            unit: this.med.unit
          })
          .then(res => {
            if (res.data.code == 200) {
              this.text = "修改" + this.med.mc + "成功";
              this.snackbar = true;
              this.$refs.form.reset();
            } else {
              this.text = "修改" + this.med.mc + "失败";
              this.snackbar = true;
            }
          });
      }else{
         this.text = "项目不能为空";
              this.snackbar = true;
      }
    },
    delMed(){//删除药品
       if (this.selected.length!==1){
          let sid = this.selected[0].id
           this.$axios
          .post("api/v1/medicine/delmd", {
            id: sid,
          })
          .then(res => {
            if (res.data.code == 200) {
              this.text = "删除" + this.med.mc + "成功";
              this.snackbar = true;
              this.$refs.form.reset();
              this.removeMed(this.desserts, sid)
            } else {
              this.text = "删除" + this.med.mc + "失败";
              this.snackbar = true;
            }
          });
        }else{
            this.text = "请选择修改的药";
            this.snackbar = true;
        }
    }
  },
  removeMed(col, id){
    col.forEach((e, i) => {
      if(e.id === id){
        let pre = col.slice(0,i)
        let end = col.slice(i+1)
        col = pre.concat(end)
      }
    });
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