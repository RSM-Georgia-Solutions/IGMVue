<template>
  <div>
    <v-text-field label="FloorNumber" placeholder="FloorNumber"></v-text-field>
  </div>
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
