<template>
  <v-container grid-list-md text-xs-center>
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
          label="დასტრულების თარიღი"
          readonly
        ></v-text-field>
        <v-date-picker v-model="plannedWorks.plannedWorksSettings.activeTo" @input="menuTo = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs10 offset-xs1 mt-3>
      <v-text-field
        label="სიხშირე"
        placeholder="სიხშირე"
        v-model="plannedWorks.frequency"
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

    this.axios
      .get(this.$store.state.baseUrl + "/PlannedWorks/" + this.$route.params.id)
      .then(res => {
        const plannedWorksRes = res.data;
        this.plannedWorks = plannedWorksRes;
        console.log(this.plannedWorks);
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
      menuTo: false
    };
  },
  methods: {
    save() {
      console.log("save");
    }
  }
};
</script>

<style>
</style>
