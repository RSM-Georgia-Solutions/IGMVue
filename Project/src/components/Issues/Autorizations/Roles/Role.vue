<template>
  <v-flex xs12>
    <v-btn block color="info" @click="NavigateToRole(Role.role)">
        <v-icon left>{{Role.icon}}</v-icon>{{Role.role}}</v-btn>
  </v-flex>
</template>
 
<script>
export default {
  props: ["Role"],

  methods: {
    NavigateToRole() {
      if (this.Role.role == "New Role") {
        this.$router.push({
          name: "NewRole"
        });
      } else {
        this.$router.push({
          name: "RoleSingle",
          params: { id: this.Role.id }
        });
      }
    }
  }
};

// @click="NavigateToRole(rol.role)"
</script>
 
<style>
</style>
 