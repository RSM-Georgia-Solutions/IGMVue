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
          role: "Admin",

          image: "http://deepchains.com/images/team.png",

          id: 1
        },

        {
          role: "Manager",

          image: "https://image.flaticon.com/icons/svg/206/206853.svg",

          id: 5
        },

        {
          role: "Cleaning",

          image: "https://image.flaticon.com/icons/svg/206/206893.svg",

          id: 4
        },

        {
          role: "Security",

          image:
            "http://blog.gosocket.net/wp-content/uploads/2016/03/test1.png",

          id: 3
        },

        {
          role: "Technician",

          image: "https://image.flaticon.com/icons/svg/206/206882.svg",

          id: 2
        },

        {
          role: "New Role",

          image:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/add.png"
        }
      ]
    };
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
