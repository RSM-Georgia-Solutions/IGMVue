<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>მარაგების მოთხოვნები</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">მარაგების მოთხოვნა</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-autocomplete
                    :items="Items"
                    item-text="itemName"
                    item-value="itemCode"
                    v-model="editedItem.itemCode"                    
                    label="საქონელი"
                    placeholder="საქონელი"
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-autocomplete
                    :items="Vendors"
                    item-text="vendorName"
                    item-value="vendorCode"
                    v-model="editedItem.vendorCode"
                    placeholder="ვენდორი"
                    label="ვენდორი"
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.quantity"
                    placeholder="რაოდენობა"
                    label="რაოდენობა"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-autocomplete
                    :items="WareHouses"
                    item-text="code"
                    item-value="code"
                    v-model="editedItem.wareHouseCode"
                    placeholder="საწყობი"
                    label="საწყობი"
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.comment"
                    label="კომენტარი"
                    placeholder="კომენტარი"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Email" placeholder="Email"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>

            <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formIsValid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="Requests">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.itemName }}</td>

        <td class="text-xs-left">{{ props.item.vendorName }}</td>

        <td class="text-xs-left">{{ props.item.email }}</td>

        <td class="text-xs-left">{{ props.item.quantity }}</td>

        <td class="text-xs-left">{{ props.item.comment }}</td>

        <td class="text-xs-left">{{ props.item.wareHouseCode }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>

          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

 

<script>
import axios from "axios";

export default {
  created() {
    this.getReq();
    ////////////////////////////////////////////////////////////////////////////////
    axios
      .get(this.$store.state.baseUrl + "/itemmasterdata", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })

      .then(res => {
        const ItemsRes = res.data;

        for (let key in ItemsRes) {
          const ItemRes = ItemsRes[key];

          this.Items.push(ItemRes);
        }
      })

      .catch(error => console.log(error));
    ////////////////////////////////////////////////////
    axios
      .get(this.$store.state.baseUrl + "/Vendors", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })

      .then(res => {
        const VendorsRes = res.data;

        for (let key in VendorsRes) {
          const VendorRes = VendorsRes[key];
          console.log(this.Vendors)
          this.Vendors.push(VendorRes);
        }
      })
      .catch(error => console.log(error));
    ////////////////////////////////////////////////

    axios
      .get(this.$store.state.baseUrl + "/WareHouse", {
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
      .then(res => {
        const wareHousesRes = res.data;
        for (let key in wareHousesRes) {
          const wareHouseres = wareHousesRes[key];
          this.WareHouses.push(wareHouseres);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "მოთხოვნის დამატება"
        : "მოთხოვნის კორეკტირება";
    },

    formIsValid() {
      return true;
      // this.editedItem.vendorName

      // this.editedItem.mobile,

      // this.editedItem.vendorName,

      // this.editedItem.Email
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  data() {
    return {
      emailRules: [
        v => !!v || "E-mail is required",

        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "E-mail must be valid"
      ],

      vendorNameRules: [v => !!v || "Name is required"],

      vendorCodeRules: [v => !!v || "Code is required"],

      mobileRules: [
        v => !!v || "Mobile is required",

        v => /^(5)\d{8}?$/.test(v) || "Mobile number must be valid"
      ],

      passwordRule: [v => !!v || "Name is required"],

      search: "",

      dialog: false,

      editedIndex: -1,

      editedItem: {
        itemName: "",
        itemCode: "",
        vendorName: "",
        vendorCode: {
          type: String
        },
        email: "",
        quantity: 0,
        comment: "",
        wareHouseCode: ""
      },

      defaultItem: {
        itemName: "",
        itemCode: "",
        vendorName: "",
        vendorCode: "",
        email: "",
        quantity: 0,
        comment: "",
        wareHouseCode: ""
      },

      headers: [
        {
          text: "საქონლის დასახელება",

          value: "itemName"
        },

        {
          text: "ვენდორის სახელი",

          value: "vendorName"
        },

        {
          text: "Email",

          value: "email"
        },

        {
          text: "რაოდენობა",

          value: "quantity"
        },

        {
          text: "კომენტარი",

          value: "comment"
        },
        {
          text: "საწყობი",

          value: "wareHouseCode"
        }
      ],

      Requests: [],
      Items: [],
      Vendors: [],
      WareHouses: []
    };
  },

  methods: {
    getReq() {
      axios
        .get(this.$store.state.baseUrl + "/GoodsIssueRequest", {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(res => {
          const RequestsRes = res.data;

          for (let key in RequestsRes) {
            const RequestRes = RequestsRes[key];
            this.Requests.push(RequestRes);
          }
        })
        .catch(error => console.log(error));
    },

    editItem(item) {
      this.editedIndex = this.Requests.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.Requests.indexOf(item);

      var confirmed =
        confirm("Are you sure you want to delete this item?") &&
        this.Requests.splice(index, 1);

      if (confirmed) {
        axios
          .delete(this.$store.state.baseUrl + "/GoodsIssueRequest/", {
            params: {
              id: item.id
            }
          })

          .then(res => {})

          .catch(error => console.log("error"));
      }
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.editedItem)
      if (this.editedIndex > -1) {
        axios
          .put(
            this.$store.state.baseUrl + "/GoodsIssueRequest/",
            this.editedItem,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token
              }
            }
          )

          .then(res => {
            Object.assign(this.Requests[this.editedIndex], this.editedItem);
            this.close();
          })

          .catch(error => console.log(error));
      } else {
        axios
          .post(
            this.$store.state.baseUrl + "/GoodsIssueRequest",
            this.editedItem,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token
              }
            }
          )
          .then(res => {
            this.Requests.push(this.editedItem);
            this.close();
          })
          .catch(error =>
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrorrr" + error)
          );
      }
    }
  }
};
</script>

<style>
</style>
