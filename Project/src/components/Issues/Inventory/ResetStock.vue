<template>

    <v-container grid-list-xs>
            <v-snackbar
      v-model="isSuccess"
      :timeout="6000"
      :color="responseColor"
       class="text-sm-lef"
      :bottom="true"
    >{{this.responseMessage}}</v-snackbar>
         <v-autocomplete     
          v-model="selectedBranch"
          :items="branches"
          item-text="branchName"
          item-value="id"
          label="ფილიალი"
          placeholder="არჩევა..."  
          required
         @change="onBranchPick"
        ></v-autocomplete>
        <v-btn block
        :disabled="buttonDisabled"
        color="success" 
          @click="
          dialog2 = true;
          resetWarehouseJournal();
        ">განულება</v-btn>
    </v-container>
</template>
<script>
import axios from "axios";
export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/Branches")
      .then((res) => {
        var branches = res.data;
        this.branches = branches;
        console.log("before", this.branches);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      branches: [],
      selectedBranch: -1,
      buttonDisabled: true,
      responseMessage: "",
      responseColor: "",
      isSuccess: false,
    };
  },

  methods: {
    onBranchPick(branchId) {
      this.selectedBranch = branchId;
      console.log(this.selectedBranch);
      this.buttonDisabled = false;
    },
    resetWarehouseJournal() {
      var confirmed = confirm("ნამდვილად გსურთ განულება?");
      console.log(confirmed);
      if (confirmed) {
        axios
          .delete(
            this.$store.state.baseUrl + "/WareHouseJournal/ResetBranchStock",
            {
              params: { branchId: this.selectedBranch },
            }
          )

          .then((res) => {
            this.responseColor = "success";
            (this.isSuccess = true), (this.responseMessage = res.data);
            console.log(res);
          })
          .catch((err) => {
            this.responseColor = "error";
            (this.isSuccess = false), (this.responseMessage = err.data);
            console.log(err);
          });
      }
    },
  },
};
</script>
<style >
</style>
