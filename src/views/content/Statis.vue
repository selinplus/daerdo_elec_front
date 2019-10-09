<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <v-card>
            <v-card-title>
              <h4 class="green--text">{{ props.item.mendian_mc }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>处方数量:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.prescription_num }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>药品数量:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.medicine_num }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: []
  }),
  mounted() {
    this.$axios.get("api/v1/mendian/psmd").then(res => {
      if (res.data.data) this.items = res.data.data;
    });
  }
};
</script>

