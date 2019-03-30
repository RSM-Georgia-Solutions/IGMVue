<template>
  <v-app>
    <v-navigation-drawer color="red" fixed temporary v-model="sideNav">
      <v-list>
        <v-list-tile to="/Issues">
          <v-list-tile-action>
            <v-icon>gavel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Issues</v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/Others">
          <v-list-tile-action>
            <v-icon>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Others</v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4">
        <router-link to="/Issues" style="pointer">
          <v-icon>home</v-icon>
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/Issues">
          <v-icon left>gavel</v-icon>Issues
        </v-btn>

        <v-btn flat left to="/Others">
          <v-icon left>widgets</v-icon>Others
        </v-btn>
        <v-list-tile></v-list-tile>
      </v-toolbar-items>

      <v-btn flat :to="{name: 'Users'}">
        <v-icon left>account_circle</v-icon>
        {{user}}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn flat class="hidden-sm-and-down" @click="logout">
        <v-icon left>logout</v-icon>Logout
      </v-btn>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      user: localStorage.firsname + " " + localStorage.lastname
    };
  },

  methods: {
    logout() {
      localStorage.token = "";
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
</style>
