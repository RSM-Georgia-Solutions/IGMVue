<template>
  <v-container fluid>
    <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      color="success"
      :bottom="true"
    >დავალების ისტორია წარმატებით შეინახა</v-snackbar>

    <v-layout row wrap v-for="task in tasksHistory" :key="task.id">
      <v-flex xs7 lg10 mt-3>
        <v-card
          @click.native="NavigateToAccidentAdded(task)"
          dark
          :class="changeColor(task.taskStatus)"
        >
          <v-card-text class="px-2">{{task.task}}</v-card-text>
        </v-card>
      </v-flex>
      <v-layout column xs5 lg2 mt-3>
        <v-radio-group v-model="task.taskStatus" row :disabled="task.disabledRed">
          <v-flex xs4 ml-2 @click="updateHistory(task.id)">
            <v-radio color="success" label="✓" value="უპრობლემო"></v-radio>
          </v-flex>
          <v-flex ml-2>
            <v-radio
              @click.native="NavigateToAccident(task)"
              color="error"
              label="X"
              value="პრობლემური"
            ></v-radio>
          </v-flex>
        </v-radio-group>
      </v-layout>
    </v-layout>
    <!-- <v-flex xs1 offset-xs4>
      <v-btn color="success" @click="SaveToHistory2">შენახვა</v-btn>
    </v-flex>-->
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default {
  data() {
    return {
      tasks: [],
      tasksHistory: [],
      isSuccess: false
    };
  },

  methods: {
    changeColor(taskStatus) {
      var x =
        taskStatus == "უპრობლემო"
          ? "success"
          : taskStatus == "პრობლემური"
          ? "error"
          : "grey";
      return x;
    },

    updateHistory(taskId) {
      var x = this.tasksHistory.find(x => x.id == taskId);
      if (this.tasksHistory == "უპრობლემო") {
        return;
      }
      this.changeColor();
      this.axios
        .put(
          this.$store.state.baseUrl + "/TaskDailyHistory/UpdateTaskHistory",
          x
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    },

    getHistory() {
      this.axios
        .get(
          this.$store.state.baseUrl +
            "/TaskDailyHistory/GetHistoryByGroup?groupId=" +
            this.$route.params.id
        )
        .then(res => {
          const tasksHistoryRes = res.data;
          for (let key in tasksHistoryRes) {
            const taskHistoryRes = tasksHistoryRes[key];
            const tasksHistory = {};
            tasksHistory.id = taskHistoryRes.id;
            tasksHistory.taskStatus = taskHistoryRes.taskStatus;
            tasksHistory.task = taskHistoryRes.taskDaily.task;
            tasksHistory.taskId = taskHistoryRes.taskDaily.id;
            console.log(taskHistoryRes);
            tasksHistory.AccidentId = taskHistoryRes.accidentId;
            tasksHistory.disabledRed =
              taskHistoryRes.taskStatus == "პრობლემური" ? true : false;
            this.tasksHistory.push(tasksHistory);
          }

          // console.log(this.tasksHistory);

          // const tasksRes = res.data.tasks;
          // for (let key in tasksRes) {
          //   const taskRes = tasksRes[key];
          //   taskRes.createDate = new Date().toISOString().substr(0, 10);
          //   taskRes.taskGroupId = this.$route.params.id;
          //   this.tasks.push(taskRes);
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },

    SaveToHistory2() {
      this.SaveToHistory();
      this.isSuccess = true;
      setTimeout(() => this.$router.go(-1), 1000);
    },

    SaveToHistory() {
      for (let key in this.tasks) {
        var taskHistory = this.tasks[key];

        Vue.delete(taskHistory, "postingDate");
        this.axios
          .post(this.$store.state.baseUrl + "/TaskDailyHistory", taskHistory)
          .then(res => {
            this.tasks[key].id = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // NavigateToAccident(picked) {
    //   if (picked.taskStatus == "პრობლემური") {
    //     this.$router.push({
    //       name: "NewAccident",
    //       params: { id: picked.taskDailyId }
    //     });
    //   }
    // }

    NavigateToAccident(picked) {
      this.$router.push({
        name: "NewAccident",
        params: { id: picked }
      });
    },

    NavigateToAccidentAdded(task) {
      if (task.taskStatus == "პრობლემური") {
        this.$router.push({
          name: "Accident",
          params: { id: task.AccidentId }
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
