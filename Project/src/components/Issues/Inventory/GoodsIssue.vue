<template>
  <v-container fluid>
    <v-layout align-space-around justify-space-around column fill-height>
      <v-snackbar
        v-model="isSuccess"
        :timeout="6000"
        :color="responseStatus"
        :bottom="true"
      >{{responseText}}</v-snackbar>

      <v-autocomplete
        :items="itemMasterData"
        item-text="itemName"
        item-value="itemCode"
        label="საქონელი"
        placeholder="არჩევა..."
        v-model="JournalEntry.itemMasterDataId"
        required        
        @change="onItemChange"
      ></v-autocomplete>

      <v-autocomplete
        :items="wareHouses"
        item-text="code"
        item-value="code"
        label="საწყობი"
        placeholder="არჩევა..."
        v-model="JournalEntry.wareHosueId"
        no-data-text="ეს საქონელი არ არის სწაყობში"
      ></v-autocomplete>

      <v-text-field
        label="რაოდენობა"
        placeholder="რაოდენობა"
        v-model="JournalEntry.quantity"
        :rules="quantityRule"
      ></v-text-field>
      <v-flex mt-3>
      <v-textarea  label="კომენტარი" placeholder="კომენტარი" v-model="JournalEntry.Comment"></v-textarea>
      </v-flex>
      <v-flex xs4 offset-xs4 offset-lg6>
        <v-btn color="success" @click="IssueItem">ჩამოწერა</v-btn>
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
      });
  },

  data() {
    return {
      responseStatus: "",
      responseText: "",

     // quantityRule: [v => v > 0 || "Invalid Quantity"],

      itemMasterData: [],

      isSuccess: false,

      wareHouses: [],

      JournalEntry: {
        wareHosueId: "",

        itemMasterDataId: "",

        quantity: "",

        userId: 0,

        Comment: "",

        systemDate: new Date().toISOString().substr(0, 10),

        postingDate: new Date().toISOString().substr(0, 10),

        AllowedNegative: true
      },

      JournalEntryDefault: {
        wareHosueId: "",

        itemMasterDataId: "",

        quantity: "",

        userId: 0,

        Comment: "",

        systemDate: new Date().toISOString().substr(0, 10),

        postingDate: new Date().toISOString().substr(0, 10),

        AllowedNegative: true
      }
    };
  },

  methods: {
    onItemChange(itemId) {
      this.wareHouses = [];
      this.axios
        .get(
          this.$store.state.baseUrl + "/WareHouseJournal/GetWareHousesByItem",
          {
            params: {
              item: itemId
            }
          }
        )

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

    reset() {
      (this.JournalEntry.wareHosueId = ""),
        (this.JournalEntry.itemMasterDataId = ""),
        (this.JournalEntry.quantity = ""),
        (this.JournalEntry.userId = 0),
        (this.JournalEntry.Comment = ""),
        (this.JournalEntry.systemDate = new Date().toISOString().substr(0, 10)),
        (this.JournalEntry.postingDate = new Date()
          .toISOString()
          .substr(0, 10)),
        (this.JournalEntry.AllowedNegative = true);
    },

    IssueItem() {
      this.JournalEntry.quantity = -this.JournalEntry.quantity;
      this.axios
        .post(
          this.$store.state.baseUrl + "/WareHouseJournal/CreateEntry",
          this.JournalEntry
        )
        .then(res => {
          this.JournalEntry = this.JournalEntryDefault;
          this.responseText = res.data;
          this.responseStatus = "success";

          this.reset();
          this.isSuccess = true;
        })
        .catch(err => {
          this.responseStatus = "error";
          this.responseText = err.response.data;
          this.isSuccess = true;
          // this.reset();
        });
    }
  }
};
</script>

<style>
</style>
