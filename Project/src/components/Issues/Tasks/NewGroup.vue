<template>
  <v-container grid-list-md text-xs-center>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field label="ჯგუფი" placeholder="ჯგუფი" v-model="group.groupName"></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-btn color="green darken-1" @click="createGroup">შენახვა</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      group: {
        groupName: ""
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
