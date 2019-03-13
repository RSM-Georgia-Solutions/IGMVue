<template>
  <v-card>
    <v-card-title primary-title>გადაჭრილი და დახურული ინციდენტები
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
      :items="Accidents"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      id="ExportToExcel"
    >
      <template slot="items" slot-scope="props">
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.id }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.type }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.username }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.buildingBranch }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.status }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.priority }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.floorNumber }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.sectorName }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.comment }}</td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.ownerName }}</td>
        <td @click="NavigateToAccident(props.item.id)" class="text-xs-left" style="cursor: pointer">
          {{ props.item.createDate
          }}
        </td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.dueDate }}</td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.endDate }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Reports/GetAccidents")
      .then(res => {
        const accidentsRes = res.data;
        for (let key in accidentsRes) {
          const acc = accidentsRes[key];
          this.Accidents.push(acc);
        }
        console.log(this.Accidents);
      })
      .catch(err => {});
  },
  data() {
    return {
      rowsPerPageItems: [
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
        10,
        5,
        25
      ],
      search: "",
      ExportToExcelFile: File,
      Accidents: [],
      headers: [
        {
          text: "Id",

          value: "id"
        },
        {
          text: "ტიპი",

          value: "type"
        },
        {
          text: "პასუხისმგებელი პირი",

          value: "username"
        },
        {
          text: "ბრენჩი",

          value: "buildingBranch"
        },
        {
          text: "სტატუსი",

          value: "status"
        },
        {
          text: "პრიორიტეტი",

          value: "priority"
        },
        {
          text: "სართული",

          value: "floorNumber"
        },
        {
          text: "სექტორი",

          value: "sectorName"
        },

        {
          text: "კომენტარი",

          value: "Comment"
        },
        {
          text: "გამომწერი",

          value: "ownerName"
        },
        {
          text: "დაწყების თარიღი",

          value: "createDate"
        },
        {
          text: "სავარაუდო დასასრული",

          value: "dueDate"
        },
        {
          text: "დასრულების თარიღი",

          value: "endDate"
        }
      ]
    };
  },
  methods: {
    ExportToExcel() {
      FileSaver.saveAs(
        this.$store.state.baseUrl +
          "/Helper/ExportToExcel?report=Accident%20Report",
        "boxski.xlsx"
      );
    }
  }
};
</script>

<style>
</style>
