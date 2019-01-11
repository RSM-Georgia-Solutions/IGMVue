<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12 lg3 offset-lg4>
        <v-card>
          <v-img :src="url" contain max-height="600"></v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-text-field disabled v-model="Accdient.sectorName" label="sectorName"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.buildingBranch" label="buildingBranch"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.floorNumber" label="floorNumber"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.priority" label="priority"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.status" label="status"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.username" label="username"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.createDate" label="createDate"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.dueDate" label="dueDate"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.comment" label="comment"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/Accidents/" + this.$route.params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        let x = res.data;
        this.Accdient = x;
        this.url =
          this.$store.state.baseUrl +
          "/Helper/GetImage?imageName=" +
          this.Accdient.imageName;
      })
      .catch(err => {
        console.log(err);
      });

    // axios
    //   .get(this.$store.state.baseUrl + "/Helper/GetImage", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.token
    //     },
    //     params: {
    //       imageName: this.Accdient.imageName
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);

    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  data() {
    return {
      Accdient: {},
      url: ""
    };
  }
};
</script>

<style>
</style>
