<template>
  <v-layout row justify-center>
    <v-btn color="primary" dark @click="dialog = true">Floors</v-btn>
  </v-layout>
</template>

<script>
export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Users")
      .then(res => console.log(res))
      .catch(error => {});
  }
};
</script>

<style>
</style>
