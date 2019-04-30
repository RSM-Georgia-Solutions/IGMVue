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
      <v-autocomplete
        :items="users"
        item-text="branch.branchName"
        item-value="branch.id"
        label="ფილიალი"
        placeholder="ფილიალი"
        v-model="planndWork.branchId"
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
          v-model="planndWork.plannedWorksSettings.StartTimeMinits"
          label="დაწყების საათი"
          readonly
        ></v-text-field>
        <v-time-picker v-model="planndWork.plannedWorksSettings.StartTimeMinits" format="24hr"></v-time-picker>
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
    //console.log(this.planndWork);
    this.axios
      .get(this.$store.state.baseUrl + "/users")

      .then(res => {
        const UsersRes = res.data;
        for (let key in UsersRes) {
          const UserRes = UsersRes[key];
          this.users.push(UserRes);
        }
        console.log(this.users);
      })

      .catch(error => console.log(error));
  },

  data() {
    return {
      menuFrom: false,
      menuTo: false,
      menuHournSelect: false,
      users: [],
      planndWork: {
        plannedWorksSettings: {
          activeFrom: new Date().toISOString().substr(0, 10),
          activeTo: new Date().toISOString().substr(0, 10),
          StartTimeMinits: "09:00",
          //StartTimeMinits: new Date().toISOString().substr(11,5),
          frequency: 0,
          branchId: 0
        }
      },
      snackbarData: {},

      isSuccess: false
    };
  },
  methods: {
    clearModel() {
      this.planndWork = {
        plannedWorksSettings: {
          activeFrom: new Date().toISOString().substr(0, 10),
          activeTo: new Date().toISOString().substr(0, 10),
          StartTimeMinits: "09:00",
          frequency: 0,
          branchId: 0
        }
      };
    },

    save() {
      console.log(this.planndWork);
      var x = this.planndWork.plannedWorksSettings.StartTimeMinits;
      var z = x.split(":");
      var q1 = z[0] * 60;
      var q2 = q1 + parseInt(z[1]);
      this.planndWork.plannedWorksSettings.StartTimeMinits = q2;
      this.planndWork.plannedWorksSettings.StartTimeMinits;
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
      this.clearModel();
    }
  }
};
</script>

<style>
</style>
