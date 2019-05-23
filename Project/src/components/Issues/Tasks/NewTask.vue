<template>
  <v-container fluid>
    <v-form ref="form">
      <v-flex xs10 offset-xs1>
        <v-text-field
          v-model="TaskModel.task"
          @change="validate"
          :rules="NameRule"
          label="დავალების სახელი"
        ></v-text-field>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-autocomplete
          :items="taskGroups"
          item-text="groupName"
          item-value="id"
          label="დავალების ჯგუფი"
          v-model="TaskModel.groupid"
          :rules="groupRule"
          @change="validate"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-autocomplete
          :items="branches"
          item-text="branchName"
          label="ფილიალი"
          v-model="TaskModel.branchId"
          :rules="branchRule"
          @change="validate"
          item-value="id"
        ></v-autocomplete>
      </v-flex>
      <v-flex offset-xs4 offset-lg6>
        <v-btn color="primary" @click="SaveTask" :disabled="disabledButton">დამატება</v-btn>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      branchRule: [v => !!v || "ფილიალი აუცილებელია"],
      NameRule: [v => !!v || "დავალების სახელი აუცილებელია"],
      groupRule: [v => !!v || "დავალების ჯგუფი აუცილებელია"],
      disabledButton: true,
      taskGroups: [],
      TaskModel: {
        task: "",
        groupid: "",
        branchId: 0
      },
      branches: []
    };
  },

  methods: {
    validate() {
      console.log(this.$refs);
      if (this.$refs.form.validate()) {
        this.disabledButton = false;
        return true;
      } else {
        this.disabledButton = true;
        return false;
      }
    },
    SaveTask() {
      console.log(this.TaskModel);
      this.axios
        .post(this.$store.state.baseUrl + "/TasksDaily", this.TaskModel)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Groups" });
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },

  created() {
    axios.get(this.$store.state.baseUrl + "/Helper/GetUserBranch").then(res => {
      const branchesData = res.data;
      for (let key in branchesData) {
        const branch = {
          id: branchesData[key].id,
          branchName: branchesData[key].branchName
        };
        this.branches.push(branch);
      }
    }),
      this.axios
        .get(this.$store.state.baseUrl + "/TaskGroups/GetGroupsBranch")
        .then(res => {
          const taskGroupsRes = res.data;
          for (let key in taskGroupsRes) {
            const taskGroup = taskGroupsRes[key];
            this.taskGroups.push(taskGroup);
          }
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>

<style>
</style>
