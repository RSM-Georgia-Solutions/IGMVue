<template>
  <v-app>
    <v-container row wrap>
      <v-flex v-for="group in Groups" :key="group.groupName">
        <v-btn block dark :style="group.style" @click="NavigateToGroup(group.id)">
          <div style="position:absolute;">{{group.groupName}}</div>
          <div
            style="margin-left: 450px;"
          >{{group.tasksNoProblemCount}} / {{group.tasksProblemCount}} / {{group.tasksNotCheckedCount}}</div>
        </v-btn>
      </v-flex>

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
import uniq from "lodash/uniq";
export default {
  data() {
    return {
      Tasks: [],
      tasks: [],
      Groups: [],
      TasksHistory: []
    };
  },

  async created() {
    this.CreateHistory();
  },

  computed: {
    unicGroups() {
      return uniq(this.Groups.map(g => g.groupId && g.groupName));
    }
  },

  methods: {
    NavigateToGroup(picked) {
      console.log(picked);
      this.$router.push({
        name: "Group",
        params: { id: picked }
      });
    },

    AddNewGroup() {
      this.Tasks.push({});
    },

    CreateHistory() {
      return this.axios
        .get(this.$store.state.baseUrl + "/TaskDailyHistory/GetTaskHistory")
        .then(res => {
          this.getGroups();
        });
    },

    getGroups() {
      this.axios
        .get(this.$store.state.baseUrl + "/TaskGroups/GetGroups")
        .then(res => {
          const GroupsRes = res.data;
          console.log(res.data);
          for (let key in GroupsRes) {
            const GroupRes = GroupsRes[key];

            const redPercent =
              (GroupRes.tasksProblemCount / GroupRes.tasksCount) * 100;
            const greenPercent =
              (GroupRes.tasksNoProblemCount / GroupRes.tasksCount) * 100;
            const grayPercent =
              (GroupRes.tasksNotCheckedCount / GroupRes.tasksCount) * 100;

            GroupRes.style =
              "background: linear-gradient(-60deg, red 0% redPercent%, green redPercent%, green greenPercent%, gray greenPercent%, gray grayPercent%);";
            GroupRes.style = GroupRes.style.replace("redPercent", redPercent);
            GroupRes.style = GroupRes.style.replace("redPercent", redPercent);
            GroupRes.style = GroupRes.style.replace(
              "greenPercent",
              greenPercent + redPercent
            );
            GroupRes.style = GroupRes.style.replace(
              "greenPercent",
              greenPercent + redPercent
            );
            GroupRes.style = GroupRes.style.replace(
              "grayPercent",
              greenPercent + redPercent + grayPercent
            );

           // GroupRes.style = "background: linear-gradient(-70deg, red 0% 40%, green 40%, green 70%, gray 70%, gray 100%);";

            console.log(GroupRes.style);

            this.Groups.push(GroupRes);
          }
        })
        .catch(err => {});
    },

    getHistory(groupId) {
      this.axios
        .get(this.$store.state.baseUrl + "/TaskGroups/GetGroups" + groupId)
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
.grad{
  /* background: linear-gradient(-60deg, red 0% 40%, green 40%, green 70%, gray 70%, gray 100%);  */
  background: red
}
</style>
