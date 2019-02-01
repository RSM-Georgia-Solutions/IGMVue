<template>
  <v-container fluid>
    <v-layout row wrap>
      <role v-for="rol in roles" :Role="rol" :key="rol.role"></role>
    </v-layout>
  </v-container>
</template>

<script>
import Role from "./Role.vue";

export default {
  components: {
    Role
  },

  data() {
    return {
      roles: [
        {
          role: "New Role",
          image:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/add.png"
        }
      ]
    };
  },

  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/Roles")
      .then(res => {
        const RolesRes = res.data;

        for (let key in RolesRes) {
          const roleRes = RolesRes[key];
          this.roles.push(roleRes);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // NavigateToRole(role) {
    //     console.log(role)
    //     if (role == 'New Role') {
    //         this.$router.push({
    //             name: 'NewRole'
    //         });
    //     } else {
    //         this.$router.push({
    //             name: 'Role',
    //             id : 1
    //         });
    //     }
    // }
  }
};
</script>

<style>
</style>
