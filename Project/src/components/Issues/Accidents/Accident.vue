<template>
  <v-container>
    <v-img :src="url2"></v-img>
    <h1>{{Accdient.imagePath}}</h1>
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
        console.log(x);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      Accdient: {},
      url:
        "http://www.cardia.com/Images/ASDheart.png",
      url2: this.$store.state.baseUrlImage +  "uploads/46ed13cbe9e763cc483e09c24b591425def3fb3e.jpeg"
    };
  }
};
</script>

<style>
</style>
