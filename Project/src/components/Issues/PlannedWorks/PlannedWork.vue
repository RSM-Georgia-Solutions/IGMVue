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
      <v-autocomplete
        :items="users"
        item-text="branch.branchName"
        item-value="branch.id"
        label="ფილიალი"
        placeholder="ფილიალი"
        v-model="plannedWorks.branchId"
      ></v-autocomplete>
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
      <v-menu
        :close-on-content-click="false"
        v-model="menuHournSelect"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="plannedWorks.plannedWorksSettings.startTimeMinits"
          label="დაწყების საათი"
          readonly
        ></v-text-field>
        <v-time-picker v-model="plannedWorks.plannedWorksSettings.startTimeMinits" format="24hr"></v-time-picker>
      </v-menu>
    </v-flex>

    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field
        label="სიხშირე"
        placeholder="სიხშირე"
        v-model="plannedWorks.plannedWorksSettings.frequency"
      ></v-text-field>
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
      <v-btn color="info" @click="save" right>შენახვა</v-btn>
      <v-btn color="error" @click="remove" left>წაშლა</v-btn>
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
        // plannedWorksRes.plannedWorksSettings.startTimeMinits = "09:00"
        var minutes = plannedWorksRes.plannedWorksSettings.startTimeMinits % 60;
        var hours =
          (plannedWorksRes.plannedWorksSettings.startTimeMinits - minutes) / 60;
        plannedWorksRes.plannedWorksSettings.startTimeMinits =
          hours.toString() + ":" + minutes.toString();

        this.plannedWorks = plannedWorksRes;

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
        plannedWorksSettings: Object,
        branchId: 0
      },
      users: [],
      menuFrom: false,
      menuTo: false,
      snackbarData: {},
      menuHournSelect: false,
      isSuccess: false
    };
  },
  methods: {
    save() {
      console.log(this.plannedWorks);
      var x = this.plannedWorks.plannedWorksSettings.startTimeMinits;
      var z = x.split(":");
      var q1 = z[0] * 60;
      var q2 = q1 + parseInt(z[1]);
      this.plannedWorks.plannedWorksSettings.startTimeMinits = q2;
      this.plannedWorks.plannedWorksSettings.startTimeMinits;
      this.axios
        .put(this.$store.state.baseUrl + "/PlannedWorks", this.plannedWorks)
        .then(res => {
          this.snackbarData.color = "success";
          this.snackbarData.text = "გეგმიური სამუშაო წარმატებით განახლდა";
          this.isSuccess = true;
          console.log(this.isSuccess);
        })
        .catch(err => {
          this.snackbarData.color = "error";
          this.snackbarData.text = "გეგმიური სამუშაო ვერ განახლდა";
          console.log(this.isSuccess);
        });
    },

    remove() {
      console.log(this.plannedWorks.id);
      this.axios
        .delete(this.$store.state.baseUrl + "/PlannedWorks", {
          params: { id: this.plannedWorks.id }
        })
        .then(res => {
          console.log(res);
           this.$router.go(-1)
        })
        .catch(err => {
          console.log(err);
        });
       
    }
  }
};
</script>

<style>
</style>
