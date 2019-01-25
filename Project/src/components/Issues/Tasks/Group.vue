<template>
  <v-container fluid>
    <v-layout row wrap v-for="task in tasks" :key="task.id">
      <v-flex xs7 lg10 mt-3>
        <v-card
          @click.native="NavigateToAccident(task.taskStatus)"
          dark
          :class="[task.taskStatus == 'უპრობლემო' ? 'success' : task.taskStatus == 'პრობლემური'? 'error' : 'grey']"
        >
          <v-card-text class="px-2">{{task.task}}</v-card-text>
        </v-card>
      </v-flex>
      <v-layout column xs5 lg2 mt-3>
        <v-radio-group v-model="task.taskStatus" row>
          <v-flex xs4 ml-2>
            <v-radio color="success" label="✓" value="უპრობლემო"></v-radio>
          </v-flex>
          <v-flex ml-2>
            <v-radio color="error" label="X" value="პრობლემური"></v-radio>
          </v-flex>
        </v-radio-group>
      </v-layout>
    </v-layout>
    <v-flex xs1 offset-xs4>
      <v-btn color="success" @click="SaveToHistory">შენახვა</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default {
  data() {
    return {
      tasks: [],
      tasksHistory: []
    };
  },

  methods: {
    getHistory() {
      this.tasks = [];
      axios
        .get(
          this.$store.state.baseUrl + "/TaskGroups/" + this.$route.params.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          }
        )
        .then(res => {
          const tasksRes = res.data.tasks;
          console.log(res.data.tasks);
          for (let key in tasksRes) {
            const taskRes = tasksRes[key];
            taskRes.createDate = new Date().toISOString().substr(0, 10);
            taskRes.taskDailyId = taskRes.id;
            taskRes.taskGroupId = this.$route.params.id;
            this.tasks.push(taskRes);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    SaveToHistory() {
      for (let key in this.tasks) {
        var taskHistory = this.tasks[key];
        Vue.delete(taskHistory, "postingDate");
        Vue.delete(taskHistory, "id");
        this.axios
          .post(this.$store.state.baseUrl + "/TaskDailyHistory", taskHistory)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.getHistory();
    },
    NavigateToAccident(picked) {
      if (picked == "პრობლემური") {
        this.$router.push({
          name: "NewAccident"
        });
      }
    }
  },

  created() {
    this.getHistory();
  }
};
</script>

<style>
</style>
