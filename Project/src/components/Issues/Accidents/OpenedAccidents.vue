<template>
  <v-card>
    <v-card-title>
      ინციდენტები
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="Accidents"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
    >
      <template slot="items" slot-scope="props">
        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left; color:red"
          style="cursor: pointer"
          datk
        >{{ props.item.id }}</td>

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.type }}</td>

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.username }}</td>

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.buildingBranch }}</td>

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.status }}</td>

        <!-- <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.priority }}</td>-->

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.floorNumber }}</td>

        <!-- <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.sectorName }}</td>-->

        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer;"
        >{{ props.item.comment }}</td>
        <td
          :bgcolor="props.item.color"
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
          style="cursor: pointer"
        >{{ props.item.ownerName }}</td>
      </template>

      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"        
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/accidents")
      .then(res => {
        const accidentsRes = res.data;

        for (let key in accidentsRes) {
          const accidentRes = accidentsRes[key];

          var date = moment(accidentRes.dueDate).add(1, "d");         

          var dueDate = new Date(accidentRes.dueDate);

          if (new Date() > date) {
            accidentRes.color = "red";
          } else {
            accidentRes.color = "yellow";
          }
          this.Accidents.push(accidentRes);
        }
        console.log(this.Accidents);
      })
      .catch(err => {
        console.log(err);
      });
  },

  data() {
    return {
      rowsPerPageItems: [
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
        25,
        10,
        5
      ],
      search: "",

      Accidents: [],

      buildingDetails: [],

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
        // {
        //   text: "პრიორიტეტი",

        //   value: "priority"
        // },
        {
          text: "სართული",

          value: "floorNumber"
        },
        // {
        //   text: "სექტორი",

        //   value: "sectorName"
        // },

        {
          text: "კომენტარი",

          value: "Comment"
        },
        {
          text: "გამომწერი",

          value: "ownerName"
        }
      ]
    };
  },

  methods: {
    NavigateToAccident(picked) {
      console.log(picked);
      this.$router.push({
        name: "Accident",
        params: { id: picked }
      });
    }
  }
};
</script>

<style>
</style>
