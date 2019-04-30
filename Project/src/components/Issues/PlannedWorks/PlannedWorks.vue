<template>
  <v-container grid-list-xs>
    <v-layout v-for="plannedWork in plannedWorks" :key="plannedWork.id" row wrap>
      <v-flex xs12>
        <v-btn
          :color="plannedWork.isActive"
          :to="{name:'PlannedWork', params:{id:plannedWork.id}}"
          block
        >{{plannedWork.name}}</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs3 mt-5 offset-xs3 lg3 offset-lg9>
        <v-btn color="info" :to="{name:'AddPlannedWork'}">ახალი გეგმიური სამუშაო</v-btn>
      </v-flex>
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

          if (plannedWorkRes.isActive) {
            plannedWorkRes.isActive = "success";
          } else {
            plannedWorkRes.isActive = "error";
          }

          this.plannedWorks.push(plannedWorkRes);
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
