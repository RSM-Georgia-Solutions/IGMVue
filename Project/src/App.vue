<template>
  <v-app>
    <v-navigation-drawer color="red" fixed temporary v-model="sideNav">
      <v-list>
        <v-list-tile to="/Issues">
          <v-list-tile-action>
            <v-icon>gavel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>საკითხები</v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/Others">
          <v-list-tile-action>
            <v-icon>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>სხვა</v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>გასვლა</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4" v-if="isLogin">
        <router-link to="/Issues" style="pointer">
          <v-icon>home</v-icon>
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-down" v-if="isLogin">
        <v-btn flat to="/Issues">
          <v-icon left>gavel</v-icon>საკითხები
        </v-btn>

        <v-btn flat left to="/Others">
          <v-icon left>widgets</v-icon>სხვა
        </v-btn>
        <v-list-tile></v-list-tile>
      </v-toolbar-items>
<!-- 
      <v-btn flat :to="{name: 'Users'}" v-if="isLogin">
        <v-icon left>account_circle</v-icon>
        {{User}}
      </v-btn> -->

      <v-btn flat v-if="userDb != null" @click="changeBranch">
        <v-icon left>call_split</v-icon>
        {{userDb.branch.branchName}}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn flat class="hidden-sm-and-down" @click="logout" v-if="isLogin">
        <v-icon left>logout</v-icon>გასვლა
      </v-btn>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      sideNav: false,
      user: localStorage.firsname + " " + localStorage.lastname,
      token: "",
      userDb: null,
      all: false
    };
  },

  methods: {
    logout() {
      localStorage.token = "";
      this.token = localStorage.token;
      this.$store.state.token = localStorage.token;
      this.$router.push("/");
    },

    getUser() {
      this.axios
        .get(this.$store.state.baseUrl + "/Helper/GetOwnUser")
        .then(res => {
          var user = res.data;
          console.log(user);
          this.userDb = user;
        })
        .catch(err => {});
    },
    changeBranch() {
      if (this.userDb.branch.id == 1) {
        this.userDb.branch.id = 2;
      } else {
        this.userDb.branch.id = 1;
      }
      this.axios
        .put(this.$store.state.baseUrl + "/users", this.userDb)
        .then(res => {
          console.log(res);
          this.getUser();
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    this.getUser(this.all);
  },

  mounted() {
    this.token = localStorage.token;
    this.$store.state.token = localStorage.token;
  },

  computed: {
    User() {
      return this.$store.state.User;
    },

    branchName() {
      return this.userDb.branch.branchName;
    },

    isLogin() {
      if (
        this.$store.state.token === "" ||
        this.$store.state.token === "undefined" ||
        this.$store.state.token == null
      ) {
        console.log(false);
        return false;
      }
      console.log(true);
      return true;
    }
  }
};
</script>

<style lang="scss">
</style>
