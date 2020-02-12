<template>
  <v-container fluid>
    <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      color="success"
      :bottom="true"
      >დავალების ისტორია წარმატებით შეინახა</v-snackbar
    >

    <v-layout row wrap v-for="task in tasksHistory" :key="task.id">
      <v-flex ml-2 xs7 lg10 mt-3>
        <v-card
          @click.native="NavigateToAccidentAdded(task)"
          dark
          :class="changeColor(task.taskStatus)"
        >
          <v-card-text class="px-2">
            <span class="headStyle">{{ task.task }}</span>
            <span class="authorStyle" v-if="task.taskStatus != 'შეუმოწმებელი'"
              >© {{ task.firstName }} {{ task.lastName }}</span
            >
          </v-card-text>
        </v-card>
      </v-flex>
      <v-layout column xs5 lg2 mt-3>
        <v-radio-group
          v-model="task.taskStatus"
          row
          :disabled="task.disabledRed"
        >
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
import debounce from "lodash/debounce";
import axios from "axios";
import Vue from "vue";
export default {
  data() {
    return {
      currentPage: 1,
      scrolledToBottom: false,
      tasks: [],
      tasksHistory: [],
      isSuccess: false
    };
  },

  computed: {},

  methods: {
    scroll() {
      window.onscroll = () => {
        let currentHeight =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) + window.innerHeight;
        let maxHeight = document.documentElement.offsetHeight;
        let scrollNow = maxHeight - currentHeight;
        console.log(scrollNow, "S");
        let bottomOfWindow = scrollNow === 0;
        // setTimeout(() => {

        //     console.log("2 seconds up, resolving myTimerPromise")

        // }, 2000);
        if (bottomOfWindow) {
          this.getHistoryTest((this.currentPage += 1));
        }
      };
    },

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
      // if (x.taskStatus == "უპრობლემო") {
      //   return;
      // }
      this.changeColor();
      this.axios
        .put(
          this.$store.state.baseUrl + "/TaskDailyHistory/UpdateTaskHistory",
          x
        )
        .then(res => {
          this.getHistoryById(x.id);
        })
        .catch(err => {
          this.getHistoryById(x.id);
        });
    },

    getHistoryById(historyId) {
      console.log("historyId", historyId);
      this.axios
        .get(
          this.$store.state.baseUrl +
            "/TaskDailyHistory/GetTaskHistory/" +
            historyId
        )
        .then(res => {
          var tasksHistoryTmp = [];
          const taskHistoryRes = res.data;
          console.log("response", taskHistoryRes);
          const tasksHistory = {};
          tasksHistory.id = taskHistoryRes.id;
          tasksHistory.taskStatus = taskHistoryRes.taskStatus;
          tasksHistory.task = taskHistoryRes.taskDaily.task;
          tasksHistory.taskId = taskHistoryRes.taskDaily.id;
          tasksHistory.firstName = taskHistoryRes.user.firstName;
          tasksHistory.lastName = taskHistoryRes.user.lastName;
          tasksHistory.AccidentId = taskHistoryRes.accidentId;
          tasksHistory.disabledRed =
            taskHistoryRes.taskStatus == "პრობლემური" ? true : false;
          tasksHistoryTmp.push(tasksHistory);
          var index = this.tasksHistory.findIndex(
            x => x.id == tasksHistoryTmp[0].id
          );
          this.tasksHistory[index] = tasksHistory;  
          Vue.set(this.tasksHistory, index, tasksHistory)
        })
        .catch(err => console.log("error", err));
    },

    getHistoryTest(currentPage) {
      console.log(currentPage);
      console.log("Get Request Run");
      this.axios
        .get(
          this.$store.state.baseUrl + "/TaskDailyHistory/GetHistoryByGroup",
          {
            params: {
              groupId: this.$route.params.id,
              CurrentPage: currentPage,
              PageSize: 30
            }
          }
        )
        .then(res => {
          console.log("Get Request End", res.data);
          var tasksHistoryTmp = [];
          const tasksHistoryRes = res.data;
          for (let key in tasksHistoryRes) {
            const taskHistoryRes = tasksHistoryRes[key];
            const tasksHistory = {};
            tasksHistory.id = taskHistoryRes.id;
            tasksHistory.taskStatus = taskHistoryRes.taskStatus;
            tasksHistory.task = taskHistoryRes.task;
            tasksHistory.taskId = taskHistoryRes.taskDailyId;
            tasksHistory.firstName = taskHistoryRes.firstName;
            tasksHistory.lastName = taskHistoryRes.lastName;
            tasksHistory.AccidentId = taskHistoryRes.accidentId;
            tasksHistory.disabledRed =
              taskHistoryRes.taskStatus == "პრობლემური" ? true : false;
            tasksHistoryTmp.push(tasksHistory);
          }
          this.tasksHistory = this.tasksHistory.concat(tasksHistoryTmp);
          console.log(this.tasksHistory);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHistory(currentPage) {
      var tasksHistoryTmp = [];
      var xz = [];
      this.axios
        .get(
          this.$store.state.baseUrl + "/TaskDailyHistory/GetHistoryByGroup",
          {
            params: {
              groupId: this.$route.params.id,
              CurrentPage: currentPage,
              PageSize: 30
            }
          }
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
            tasksHistory.firstName = taskHistoryRes.user.firstName;
            tasksHistory.lastName = taskHistoryRes.user.lastName;
            tasksHistory.AccidentId = taskHistoryRes.accidentId;
            tasksHistory.disabledRed =
              taskHistoryRes.taskStatus == "პრობლემური" ? true : false;
            tasksHistoryTmp.push(tasksHistory);
          }
          this.tasksHistory = tasksHistoryTmp;
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

    NavigateToAccident(picked) {
      console.log("Picked", picked);
      this.$router.push({
        name: "NewAccident",
        params: { id: picked, task: picked.task }
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
    this.getHistoryTest(this.currentPage);
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style>
.authorStyle {
  position: relative;
  left: 10px;
  color: whitesmoke;
  font-size: 0.8em;
}
</style>
