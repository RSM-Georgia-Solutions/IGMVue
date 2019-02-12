<template>
  <v-card>
    <v-card-title>ინციდენტები
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
          @click.native="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.id }}</td>
        <td @click="NavigateToAccident(props.item.id)" class="text-xs-left">{{ props.item.type }}</td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.username }}</td>
        <td
          @click.native="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.buildingBranch }}</td>
        <td @click="NavigateToAccident(props.item.id)" class="text-xs-left">{{ props.item.status }}</td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.priority }}</td>
        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.floorNumber }}</td>

        <td
          @click="NavigateToAccident(props.item.id)"
          class="text-xs-left"
        >{{ props.item.sectorName }}</td>

        <td @click="NavigateToAccident(props.item.id)" class="text-xs-left">{{ props.item.comment }}</td>
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

export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/accidents", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const accidentsRes = res.data;

        for (let key in accidentsRes) {
          const accidentRes = accidentsRes[key];
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
        10,
        5,
        25
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
