<template>
  <v-container fluid>
    <v-flex xs10 offset-xs1>
      <v-text-field v-model="TaskModel.task" label="დავალების სახელი"></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-autocomplete
        :items="taskGroups"
        item-text="groupName"
        item-value="id"
        label="დავალების ჯგუფი"
        v-model="TaskModel.groupid"
      ></v-autocomplete>
    </v-flex>
    <v-flex offset-xs4 offset-lg6>
      <v-btn color="primary" @click="SaveTask">დამატება</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      taskGroups: [],
      TaskModel: {
        task: "",
        groupid: ""
      }
    };
  },

  methods: {
    SaveTask() {
      console.log(this.TaskModel);
      axios
        .post(this.$store.state.baseUrl + "/TasksDaily", this.TaskModel, {
          headers: {
            Authorization: "Barer " + localStorage.token
          }
        })
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Groups" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    axios
      .get(this.$store.state.baseUrl + "/TaskGroups", {
        headers: {
          Authorization: "Barer " + localStorage.token
        }
      })
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
