<template>
  <v-app>
    <v-container grid-list-md>
      <v-layout v-for="task in Tasks" :key="task.groupName" ustify-space-around>
        <v-flex xs12>
          <v-btn
            :to="{name:'Group', params:{id:task.id}}"
            block
            :color="task.color"
            light
            class="mt-4;"
          >{{task.groupName}}</v-btn>
        </v-flex>
      </v-layout>

      <v-layout grid-list-md>
        <v-flex>
          <v-btn color="warning" class="mt-4">ისტორია</v-btn>
        </v-flex>
        <v-flex xs6 offset-lg8>
          <v-btn :to="{name:'NewGroup'}" color="success" class="mt-4 pa-1">ახალი ჯგუფი</v-btn>
        </v-flex>
      </v-layout>
      <v-flex xs3 offset-xs5 offset-lg9>
        <v-btn :to="{name:'NewTask'}" color="success" class="mt-4 pa-1">ახალი დავალება</v-btn>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Tasksxx: [
        {
          Name: "შლაგბაუმის სისტემა",

          Progress: "7/8",

          color: "grey",

          colorH1: "color : grey"
        }
      ],

      Tasks: []
    };
  },

  created() {
    axios
      .get(this.$store.state.baseUrl + "/taskgroups", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const tasksRes = res.data;
        for (let key in tasksRes) {
          const taskRes = tasksRes[key];
          taskRes.color = "grey";
          taskRes.binding = "one";
          for (let key in taskRes.tasks) {
            taskRes.tasks[key].binding = "one";
          }
          this.Tasks.push(taskRes);
        }
        console.log('Tasks =>' , this.Tasks);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    AddNewGroup() {
      this.Tasks.push({});
    }
  }
};
</script>

<style>
</style>
