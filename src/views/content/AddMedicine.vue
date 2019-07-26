<template>
  <v-container id="create">
    <v-layout row flex>
        <v-flex xs8 sm8 md8 lg8>
            <v-text-field
                label="输入拼音查询"
                outlined
                color="orange"
                clearable
                v-model="condition"
            ></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 md2 lg2>
            <v-btn flat icon color="deep-orange" @click="query">
              <v-icon>search</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    
   <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline amber lighten-2"
          primary-title
        >
          Med Add
        </v-card-title>
        <v-layout xs10 md10 lg10 justify-center>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                v-model="mc"
                :counter="50"
                :rules="rules"
                label="名称"
                required
                ></v-text-field>

                <v-text-field
                v-model="style"
                :rules="rules"
                label="规格"
                required
                ></v-text-field>

                <v-text-field
                v-model="unit"
                :rules="rules"
                label="单位"
                required
                ></v-text-field>

                <v-text-field
                v-model="source"
                :rules="rules"
                label="产地"
                required
                ></v-text-field>
                <v-btn
                color="error"
                flat
                @click="reset"
                >
                清空
                </v-btn>
            </v-form>
        </v-layout>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"            
            @click="save"
          >
            保存
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
    select-all
    item-key="id"
    class="elevation-1"
  >
        <template v-slot:headers="props">
        <tr>
            <th>
            <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
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
            <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
            ></v-checkbox>
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
      transition='slide-y-reverse-transition'
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">close</v-icon>
          <v-icon v-else>account_circle</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="dialog=!dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      timeout="3000"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { truncate } from 'fs';
  export default {
    data: () => ({
      condition:null,
      fab:false,
      dialog: false,
      snackbar: false,
      color: "orange",
      text: "",
      mc:null,
      style:null,
      unit:null,
      source:null,

      rules: [
            v => !!v || '内容必须填写',
            v => (v && v.length <= 100) || '不能超过50字'
        ],
      pagination: {
        sortBy: 'ID'
      },
      selected: [],
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        { text: '名称', value: 'mc' },
        { text: '规格', value: 'style' },
        { text: '单位', value: 'unit' },
        { text: '产地', value: 'source' }
      ],
      desserts: []
    }),

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      query(){
          if (this.condition.length){
              this.$axios.get('api/v1/medicine/py?py='+this.condition).then(res =>{
                  if(res.data.data)
                  this.desserts = res.data.data
              })
          }
      },
      reset () {
        this.$refs.form.reset()
      },
      save(){
          if (this.mc && this.unit && this.style && this.source){
              this.$axios.post('api/v1/medicine/addmd',{"mc":this.mc,"style":this.style,"source":this.source,"unit":this.unit}).then(res =>{
                  if(res.data.code == 200){
                      this.text = '添加'+this.mc +'成功'
                      this.snackbar = true
                      this.$refs.form.reset()
                  }else{
                      this.text = '添加'+this.mc +'失败'
                      this.snackbar = true
                  }
              })
          }
      }
    }
  }
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