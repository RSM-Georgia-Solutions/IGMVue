<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12 lg3 offset-lg4>
        <v-card>
          <v-img :src="url" contain max-height="600"></v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-text-field disabled v-model="Accdient.sectorName" label="სექტორი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.buildingBranch" label="ფილიალი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.floorNumber" label="სართული"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.priority" label="პრიორიტეტი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.type" label="ტიპი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-autocomplete
          :items="Status"
          v-model="Accdient.status"
          label="სტატუსი"
          placeholder="არჩევა..."
          required
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.username" label="username"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.createDate" label="შექმნის თარიღი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.dueDate" label="შესრულების თარიღი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field disabled v-model="Accdient.comment" label="კომენტარი"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn right color="primary" @click="UpdateAccident">შენახვა</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/Helper/GetStatuses")

      .then(res => {
        const statusesRes = res.data;

        for (let key in statusesRes) {
          const status = statusesRes[key];
          this.Status.push(status);
        }
      })
      .catch(err => {
        console.log(err);
      });
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
  },
  data() {
    return {
      Accdient: {},
      url: "",
      Status: []
    };
  },
  methods: {
    UpdateAccident() {
      console.log(this.Accdient);
      this.axios
        .put(this.$store.state.baseUrl + "/accidents", this.Accdient)
        .then(res => {
          console.log(res);
          if(this.Accdient.status == 'დასადასტურებელი')
          this.$router.push({
            name: "GoodsIssue"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
