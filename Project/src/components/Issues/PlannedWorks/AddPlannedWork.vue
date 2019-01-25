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
        v-model="planndWork.name"
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
          v-model="planndWork.plannedWorksSettings.activeFrom"
          label="დაწყების თარიღი"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="planndWork.plannedWorksSettings.activeFrom"
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
          v-model="planndWork.plannedWorksSettings.activeTo"
          label="დასრულების თარიღი"
          readonly
        ></v-text-field>
        <v-date-picker v-model="planndWork.plannedWorksSettings.activeTo" @input="menuTo = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field
        label="სიხშირე"
        placeholder="სიხშირე"
        v-model="planndWork.plannedWorksSettings.frequency"
      ></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-autocomplete
        :items="users"
        item-text="username"
        item-value="id"
        label="პასუხისმგებელი პირი"
        placeholder="პასუხისმგებელი პირი"
        v-model="planndWork.plannedWorksSettings.userId"
      ></v-autocomplete>
    </v-flex>

    <v-flex xs10 offset-xs1>
      <v-btn color="info" @click="save">შენახვა</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
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
  },

  data() {
    return {
      menuFrom: false,
      menuTo: false,
      users: [],
      planndWork: {
        plannedWorksSettings: {
          activeFrom: new Date().toISOString().substr(0, 10),
          activeTo: new Date().toISOString().substr(0, 10),
          frequency : 0
        }
      },
      snackbarData: {},

      isSuccess: false
    };
  },
  methods: {
    save() {
      console.log(this.planndWork)
      this.axios
        .post(this.$store.state.baseUrl + "/PlannedWorks", this.planndWork)
        .then(res => {
          this.snackbarData.color = "success";
          this.snackbarData.text = "გეგმიური სამუშაო წარმატებით დაემატა";
          this.isSuccess = true;
        })
        .catch(err => {
          this.snackbarData.color = "error";
          this.snackbarData.text = "გეგმიური სამუშაო ვერ დაემატა";
        });
    }
  }
};
</script>

<style>
</style>
