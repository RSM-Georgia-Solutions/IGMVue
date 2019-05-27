<template>
  <v-card>
    <v-card-title primary-title>დავალებები
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
      :items="tasks"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      id="ExportToExcel"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left" style="cursor: pointer">{{ props.item.id }}</td>
        <td class="text-xs-left" style="cursor: pointer">{{ props.item.task }}</td>

        <td class="text-xs-left" style="cursor: pointer">{{ props.item.createDate }}</td>

        <td class="text-xs-left" style="cursor: pointer">{{ props.item.taskStatus }}</td>

        <td class="text-xs-left" style="cursor: pointer">{{ props.item.updateDate }}</td>

        <td class="text-xs-left" style="cursor: pointer">{{ props.item.branch.branchName }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
export default {
  created() {
    console.log('1')
    this.axios
      .get(this.$store.state.baseUrl + "/TaskDailyHistory/GetFullTaskHistory")
      .then(res => {
        console.log('res')
        console.log(res)
        const tasksRes = res.data;
        for (let key in tasksRes) {
          const taskRes = tasksRes[key];
          taskRes.createDate = new Date(taskRes.createDate)
            .toISOString()
            .substr(0, 10);
          taskRes.updateDate = new Date(taskRes.updateDate)
            .toISOString()
            .substr(0, 10);
          this.tasks.push(taskRes);
        }
        console.log(res.data, 'aaaaaaaaaaa');
      })
      .catch(err => {console.log(err,'errrr')});
      console.log('last')
  },
  data() {
    return {
      rowsPerPageItems: [        
        50,
        100,
        200,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      search: "",
      tasks: [],
      headers: [
        {
          text: "Id",

          value: "id"
        },
        {
          text: "დავალება",

          value: "task"
        },
        {
          text: "შექმნის თარიღი",

          value: "createDate"
        },
        {
          text: "სტრატუსი",

          value: "taskStatus"
        },
        {
          text: "რედაქტირების თარიღი",

          value: "updateDate"
        },
        {
          text: "ფილიალი",

          value: "branchName"
        }
      ]
    };
  },
  methods: {
    ExportToExcel() {
      FileSaver.saveAs(
        this.$store.state.baseUrl +
          "/Helper/ExportToExcel?report=Tasks%20Report",
        "boxski.xlsx"
      );
    }
  }
};
</script>

<style>
</style>
