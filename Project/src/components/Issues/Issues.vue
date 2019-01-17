<template>
  <v-container fluid>
    <v-layout column>
      <v-btn color="teal darken-2" dark class="mt-5" :to="{name:'Groups'}">დავალებები</v-btn>

      <v-btn color="success" class="mt-4" :to="{name:'NewAccident'}">ინციდენტის დამატება</v-btn>

      <v-btn color="warning" class="mt-4" :to="{name:'OpenAccidents'}">ღია ინციდენტები</v-btn>

      <v-btn color="info" class="mt-4" :to="{name:'PlannedWorks'}">გეგმიური სამუშაოები</v-btn>

      <v-btn color="cyan" class="mt-4" :to="{name:'Inventory'}">მარაგები/საწყობები</v-btn>

      <v-btn color="pink" class="mt-4" :to="{name:'Vendors'}">ვენდორები</v-btn>

      <v-btn color="teal accent-3" class="mt-4" :to="{name:'Report'}" dark>რეპორტები</v-btn>

      <v-btn color="purple" class="mt-4" :to="{name:'Users'}">მომხმარებლები</v-btn>

      <v-btn color="blue accent-3" class="mt-4" :to="{name:'Autorizations'}" dark>ავტორიზაციები</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Users")
      .then(res => console.log(res))
      .catch(error => {
        console.log("error = GetUsers " + error);
        this.$router.push({
          name: "Login"
        });
      });
  },

  data() {
    return {};
  }
};
</script>

<style>
</style>
