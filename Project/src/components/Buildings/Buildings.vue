<template>
  <v-app>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md4 xs12 offset-md4>
          <v-btn block round color="info" dark to="/NewBuilding">
            <v-icon>add</v-icon>Add Building
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <app-building v-for="building in Buildings" :Building="building" :key="building.branch"></app-building>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Building from "./Building.vue";

export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Users")
      .then(res => console.log(res))
      .catch(error => {});
  },

  data() {
    return {
      Buildings: [
        {
          branch: "ვაჟა",

          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFtV26TrzDDse_Lb57HW8ns8XUMJgPTP8eNA7rX-51KK0Gu_tV"
        },

        {
          branch: "გლდანი",

          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAglptZEJsOSE8b_h4UXe3kp9SjNpJZkoz6uRaLmqxIcBUIBcx"
        },

        {
          branch: "ქავთარაძე",

          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCFLuNhvtAlsI_B1vU2TPADEWLBZBun0idCjOVSdmAy2kxzus"
        }
      ]
    };
  },

  components: {
    appBuilding: Building
  }
};
</script>

<style>
.btnadd {
  color: rgb(240, 57, 57);
}
</style>
