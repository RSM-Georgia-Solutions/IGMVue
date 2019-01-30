<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md3>
      <v-text-field label="Branch" placeholder="Branch"></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 md3>
      <v-text-field label="Adress" placeholder="Adress"></v-text-field>
    </v-flex>
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
