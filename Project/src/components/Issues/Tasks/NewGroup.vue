<template>
  <v-container grid-list-md text-xs-center>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field label="ჯგუფი" placeholder="ჯგუფი" v-model="group.groupName"></v-text-field>
    </v-flex>
       <v-flex xs10 offset-xs1>
      <v-autocomplete
        :items="branches"
        item-text="branchName"
        item-value="id"
        label="ფილიალი"
        v-model="group.branchId"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-btn color="info" light @click="createGroup">შენახვა</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/branches")

      .then(res => {
        const branchesData = res.data;

        for (let key in branchesData) {
          const branch = {
            id: branchesData[key].id,
            branchName: branchesData[key].branchName
          };

          this.branches.push(branch);
        }
      });
  },

  data() {
    return {
      branches: [],
      group: {
        groupName: "",
        branchId: ""
      }
    };
  },

  methods: {
    createGroup() {
      console.log(this.group);
      axios
        .post(this.$store.state.baseUrl + "/taskgroups", this.group, {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Groups" });
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
