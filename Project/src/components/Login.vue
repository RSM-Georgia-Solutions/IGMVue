<template>
  <v-container @keyup.enter="authenticate" grid-list-xs>
    <v-snackbar
      mt-3
      v-model="isError"
      :timeout="4000"
      color="error"
      :bottom="true"
    >არასწორი მომხმარებელი/პაროლი</v-snackbar>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 mt-5>
        <h1>Login</h1>

        <v-text-field
          :rules="emailRules"
          v-model="credentials.username"
          label="User"
          placeholder="User"
          name="email"
        ></v-text-field>
        <v-text-field
          :rules="passwordlRules"
          v-model="credentials.password"
          label="Password"
          placeholder="Password"
          type="Password"
          autocomplete="new-password"
          id="id"
          name="Password"
        ></v-text-field>
      </v-flex>
      <v-flex xs8 offset-xs2 text-xs-center mt-3>
        <v-btn class="success" @click="authenticate" dark align-center>
          <v-icon left>account_circle</v-icon>Login
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },

      redirectUrl: "",
      isError: false,

      emailRules: [
        v => !!v || "username is required"

        // v =>
        //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        //     v
        //   ) || "E-mail must be valid"
      ],

      passwordlRules: [v => !!v || "Password is required"]
    };
  },

  mutations: {
    storeToken(state, token) {
      this.$store.state.token = token;
    }
  },

  created() {
    this.redirectUrl = this.$store.state.UrlRedirect;
    console.log(this.redirectUrl, "Redirection");
  },
  methods: {
    authenticate() {
      this.axios
        .post(
          this.$store.state.baseUrl + "/Users/authenticate",
          this.credentials
        )
        .then(res => {
          localStorage.token = res.data.token;
          this.$store.state.token = res.data.token;
          localStorage.username = res.data.username;
          localStorage.firsname = res.data.firstName;
          localStorage.lastname = res.data.lastName;
          this.$store.state.User = res.data.firstName + ' ' + res.data.lastName;

          if (this.redirectUrl != "") {
            this.$router.push(this.redirectUrl);
            this.redirectUrl = "";
          } else {
            this.$router.push({
              name: "Accidents"
            });
          }
        })
        .catch(err => {
          console.log(this.credentials);
          console.log(err.response.status + err);
          if ((err.response.status = 401)) {
            this.isError = true;
          }
        });
    }
  }
};
</script>

<style>
</style>
