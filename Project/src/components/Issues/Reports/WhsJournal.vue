<template>
  <div>
    <v-card-title primary-title>ტრანზაქციების ისტორია
      <v-spacer></v-spacer>
      <v-flex xs3 mr-5>
        <v-btn color="success" x-large @click="ExportToExcel">
          <img src="https://img.icons8.com/material/24/000000/ms-excel.png">
          ექსპორტი
        </v-btn>
      </v-flex>
      <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="whsJournal"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.wareHosueId }}</td>
        <td class="text-xs-left">{{ props.item.wareHosueBranch }}</td>
        <td class="text-xs-left">{{ props.item.itemMasterDataId }}</td>
        <td class="text-xs-left">{{ props.item.itemMasterDataName }}</td>
        <!-- <td class="text-xs-left">{{ props.item.postingDate }}</td> -->
        <td class="text-xs-left">{{ props.item.systemDate }}</td>
        <td class="text-xs-left">{{ props.item.quantity }}</td>
        <td class="text-xs-left">{{ props.item.userName }}</td>
        <td class="text-xs-left">{{ props.item.cumulativeQuantity }}</td>
        <td class="text-xs-left">{{ props.item.comment }}</td>

        <td class="justify-center layout px-0"></td>
      </template>
    </v-data-table>
  </div>
</template> 
<script>
import axios from "axios";
import FileSaver from "file-saver";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/WareHouseJournal/GetEntryes", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const entriesRes = res.data;

        for (let key in entriesRes) {
          const entryRes = entriesRes[key];

          this.whsJournal.push(entryRes);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ExportToExcel() {
      FileSaver.saveAs(
        this.$store.state.baseUrl +
          "/Helper/ExportToExcel?report=WareHouse%20Report",
        "boxski.xlsx"
      );
    }
  },
  data() {
    return {
      ExportToExcelFile: File,
      search: "",
      rowsPerPageItems: [
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
        25,
        10,
        5
      ],
      search: "",
      whsJournal: [],
      headers: [
        {
          text: "გატარების ნომერი",
          value: "id"
        },
        {
          text: "საწყობის კოდი",
          value: "wareHosueId"
        },
        {
          text: "ფილიალი",
          value: "wareHosueBranch"
        },
        {
          text: "საქონლის კოდი",
          value: "itemMasterDataId"
        },
        {
          text: "საქონლის დასახელება",
          value: "itemMasterDataName"
        },
        {
          text: "დაპოსტვის თარიღი",
          value: "postingDate"
        },
        // {
        //   text: "გატარების თარიღი",
        //   value: "systemDate"
        // },
        {
          text: "რაოდენობა",
          value: "quantity"
        },
        {
          text: "მომხმარებელი",
          value: "userName"
        },
        {
          text: "ჯამური რაოდენობა",
          value: "cumulativeQuantity"
        },
        {
          text: "კომენტარი",
          value: "comment"
        }
      ]
    };
  }
};
</script>

<style>
</style>
