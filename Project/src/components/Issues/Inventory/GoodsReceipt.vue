<template>
  <v-container fluid>
    <v-layout align-space-around justify-space-around column fill-height>
      <v-snackbar
        v-model="isSuccess"
        :timeout="4000"
        color="success"
        :bottom="true"
      >საქონელი მიღებულია</v-snackbar>
      <v-autocomplete
        :items="itemMasterData"
        item-text="itemName"
        item-value="itemCode"
        label="საქონელი"
        placeholder="არჩევა..."
        v-model="JournalEntry.itemMasterDataId"
        required
      ></v-autocomplete>

      <v-autocomplete
        :items="wareHouses"
        item-text="code"
        item-value="code"
        label="საწყობი"
        placeholder="არჩევა..."
        v-model="JournalEntry.wareHosueId"
        required
      ></v-autocomplete>

      <v-text-field
        label="რაოდენობა"
        placeholder="რაოდენობა"
        v-model="JournalEntry.quantity"
        :rules="quantityRule"
      ></v-text-field>

      <v-textarea label="კომენტარი" placeholder="კომენტარი" v-model="JournalEntry.Comment"></v-textarea>

      <v-flex xs4 offset-xs4 offset-lg6>
        <v-btn color="success" @click="IssueItem">მიღება</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios
      .get(this.$store.state.baseUrl + "/itemMasterData")

      .then(res => {
        const itemMasterDataRes = res.data;

        for (let key in itemMasterDataRes) {
          const item = itemMasterDataRes[key];

          this.itemMasterData.push(item);
        }
      })

      .catch(err => {
        console.log(err);
      }),
      axios
        .get(this.$store.state.baseUrl + "/WareHouse", {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })

        .then(res => {
          const wareHousesRes = res.data;

          for (let key in wareHousesRes) {
            const whs = wareHousesRes[key];

            this.wareHouses.push(whs);
          }
        })

        .catch(err => {
          console.log(err);
        });
  },

  data() {
    return {
      quantityRule: [v => v > 0 || "Invalid Quantity"],

      itemMasterData: [],

      wareHouses: [],

      isSuccess: false,

      JournalEntry: {
        wareHosueId: "",

        itemMasterDataId: "",

        quantity: "",

        userId: 0,

        Comment: "",

        systemDate: new Date().toISOString().substr(0, 10),

        postingDate: new Date().toISOString().substr(0, 10),

        AllowedNegative: false
      }
    };
  },

  methods: {
    reset() {
      this.JournalEntry.wareHosueId = "";
      this.JournalEntry.itemMasterDataId = "";
      this.JournalEntry.quantity = "";
      this.JournalEntry.userId = 0;
      this.JournalEntry.Comment = "";
      this.JournalEntry.systemDate = new Date().toISOString().substr(0, 10);
      this.JournalEntry.postingDate = new Date().toISOString().substr(0, 10);
      this.JournalEntry.AllowedNegative = false;
    },
    IssueItem() {
      axios
        .post(
          this.$store.state.baseUrl + "/WareHouseJournal/CreateEntry",
          this.JournalEntry,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token
            }
          }
        )
        .then(res => {
          this.isSuccess = true;
          this.reset();
        })
        .catch(err => {
          console.log(this.JournalEntry, err);
          this.reset();
        });
    }
  }
};
</script>

<style>
</style>
