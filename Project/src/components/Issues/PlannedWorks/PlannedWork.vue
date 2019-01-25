<template>
  <v-container grid-list-md text-xs-center>
    <v-snackbar
      v-model="isSuccess"
      :timeout="4000"
      :color="snackbarData.color"
      :bottom="true"
    >{{snackbarData.text}}</v-snackbar>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field
        label="გეგმიური სამუშაო"
        placeholder="გეგმიური სამუშაო"
        v-model="plannedWorks.name"
      ></v-text-field>
    </v-flex>

    <v-flex xs10 offset-xs1 mt-3>
      <v-menu
        :close-on-content-click="false"
        v-model="menuFrom"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="plannedWorks.plannedWorksSettings.activeFrom"
          label="დაწყების თარიღი"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="plannedWorks.plannedWorksSettings.activeFrom"
          @input="menuFrom = false"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-menu
        :close-on-content-click="false"
        v-model="menuTo"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="plannedWorks.plannedWorksSettings.activeTo"
          label="დასრულების თარიღი"
          readonly
        ></v-text-field>
        <v-date-picker v-model="plannedWorks.plannedWorksSettings.activeTo" @input="menuTo = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field label="სიხშირე" placeholder="სიხშირე" v-model="plannedWorks.plannedWorksSettings.frequency"></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-autocomplete
        :items="users"
        item-text="username"
        item-value="id"
        label="პასუხისმგებელი პირი"
        placeholder="პასუხისმგებელი პირი"
        v-model="plannedWorks.plannedWorksSettings.userId"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-btn color="info" @click="save">შენახვა</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  created() {
    this.axios
      .get(this.$store.state.baseUrl + "/users")
      .then(res => {
        const UsersRes = res.data;
        for (let key in UsersRes) {
          const UserRes = UsersRes[key];
          this.users.push(UserRes);
        }
      })
      .catch(error => console.log(error));

    this.axios
      .get(this.$store.state.baseUrl + "/PlannedWorks/" + this.$route.params.id)
      .then(res => {
        const plannedWorksRes = res.data;
        this.plannedWorks = plannedWorksRes;
        console.log(this.plannedWorks.plannedWorksSettings.activeFrom);

        console.log(
          moment(
            String(this.plannedWorks.plannedWorksSettings.activeFrom)
          ).format("MM/DD/YYYY hh:mm")
        );

        this.plannedWorks.plannedWorksSettings.activeTo = moment(
          String(this.plannedWorks.plannedWorksSettings.activeTo)
        ).format("YYYY-MM-DD");
        this.plannedWorks.plannedWorksSettings.activeFrom = moment(
          String(this.plannedWorks.plannedWorksSettings.activeFrom)
        ).format("YYYY-MM-DD");
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      plannedWorks: {
        id: 0,
        name: "",
        plannedWorksSettings: Object
      },
      users: [],
      menuFrom: false,
      menuTo: false,
      snackbarData: {},
      isSuccess: false
    };
  },
  methods: {
    save() {
      console.log(this.plannedWorks);
      this.axios
        .put(this.$store.state.baseUrl + "/PlannedWorks", this.plannedWorks)
        .then(res => {
          this.snackbarData.color = "success";
          this.snackbarData.text = "გეგმიური სამუშაო წარმატებით დაემატა";
          this.isSuccess = true;
          console.log(this.isSuccess);
        })
        .catch(err => {
          this.snackbarData.color = "error";
          this.snackbarData.text = "გეგმიური სამუშაო ვერ დაემატა";
          console.log(this.isSuccess);
        });
    }
  }
};
</script>

<style>
</style>
