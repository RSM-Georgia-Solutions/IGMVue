<template>
  <v-card>
    <v-card-title>საქონელი/საწყობი
      <v-spacer></v-spacer>
      <v-flex xs1>
        <JsonExcel :data="stockReport" mt-5>
          <img src="https://img.icons8.com/material/24/000000/ms-excel.png">
        </JsonExcel>
      </v-flex>

      <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="stockReport" :search="search" id="ExportToExcel">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left" @click="abc">{{ props.item.itemDescription }}</td>

        <td class="text-xs-left">{{ props.item.wareHouseCode }}</td>

        <td class="text-xs-left">{{ props.item.wareHouseBranch }}</td>

        <td class="text-xs-left">{{ props.item.quantity }}</td>

        <td class="justify-center layout px-0"></td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import JsonExcel from "vue-json-excel";
export default {
  components: {
    JsonExcel
  },
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Reports/GetInStockItems")
      .then(res => {
        const stockReportRes = res.data;
        for (let key in stockReportRes) {
          const stockRep = stockReportRes[key];
          this.stockReport.push(stockRep);
        }
        console.log(this.stockReport);
      })
      .catch(err => {});
  },
  data() {
    return {
      stockReport: [],
      search: "",
      headers: [
        {
          text: "საქონელი",

          value: "itemDescription"
        },
        {
          text: "საწყობის დასახელება",

          value: "wareHouseCode"
        },
        {
          text: "ფილიალი",

          value: "wareHouseBranch"
        },
        {
          text: "ხელმისაწვდომი რაოდენობა",

          value: "quantity"
        }
      ]
    };
  },

  methods: {
    abc() {}
  }
};
</script>

<style>
</style>
