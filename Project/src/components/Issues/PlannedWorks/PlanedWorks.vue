<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-btn color="lime accent-3" block>text</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      plannedWorks: []
    };
  },
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/PlannedWorks")
      .then(res => {
        const plannedWorksRes = res.data;
        for (let key in plannedWorksRes) {
          const plannedWorkRes = plannedWorksRes[key];
          this.plannedWorks = plannedWorkRes;
        }
        console.log(this.plannedWorks);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
