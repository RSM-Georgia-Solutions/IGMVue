<template>
  <v-app>
    <v-container row wrap>
      <v-layout v-for="task in Tasks" :key="task.groupName">
        <v-flex>
          <v-btn
            :to="{name:'Group', params:{id:task.id}}"
            block
            :color="task.color"
            light
            class="mt-4;"
          >{{task.groupName}}</v-btn>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12>
          <v-btn :to="{name:'NewGroup'}" color="primary" class="mt-4 pa-1">ახალი ჯგუფი</v-btn>
        </v-flex>

        <v-flex xs6 offset-lg8>
          <v-btn :to="{name:'NewTask'}" color="primary" class="mt-4 pa-1">ახალი დავალება</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
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

      Tasks: [],
      tasks: []
    };
  },

  created() {
    this.getGroups();
    this.paint(1);
  },

  methods: {
    AddNewGroup() {
      this.Tasks.push({});
    },

    getGroups() {
      this.axios
        .get(this.$store.state.baseUrl + "/taskgroups")
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
            this.getHistory(taskRes.id);
          }
          console.log(this.tasks);
        })
        .catch(err => {});
    },

    getHistory(groupId) {
      this.axios
        .get(this.$store.state.baseUrl + "/TaskGroups/" + groupId)
        .then(res => {
          const tasksRes = res.data.tasks;
          for (let key in tasksRes) {
            const taskRes = tasksRes[key];
            taskRes.createDate = new Date().toISOString().substr(0, 10);
            //  taskRes.taskDailyId = taskRes.id;
            taskRes.taskGroupId = groupId;
            this.tasks.push(taskRes);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    paint(groupId) {
      var x = this.tasks;
      console.log(x, "xxxxxxxxxxx");
    }
  }
};
</script>

<style>
</style>
