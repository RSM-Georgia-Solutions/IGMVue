<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2 sm6 mt-3 lg8>
      <v-text-field label="როლი" placeholder="როლი" v-model="postItem.role"></v-text-field>
    </v-flex>

    <v-flex v-for="perm in permissions" :key="perm.id" xs6 offset-xs3 lg6 offset-lg3>
      <v-checkbox :label="perm.permission" v-model="selected" :value="perm.id"></v-checkbox>
    </v-flex>
    <v-flex xs6 offset-xs4>
      <v-btn
        color="blue"
        class="mt-5"
        right
        @click="sendreq"
        slot="activator"
        aspect-ratio="2.75"
      >დამახსოვრება</v-btn>
    </v-flex>
    <v-flex xs6 offset-xs4>
      <div class="text-xs-center">
        <v-dialog v-model="showImage" width="500">
          <v-card>
            <v-img v-for="item in items" :key="item.avatar" :src="item.avatar"></v-img>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selected: [],
      showImage: false,
      items: [],

      permissions: [],

      postItem: {
        role: "",
        permissionRoles: []
      }
    };
  },

  methods: {
    sendreq() {
      console.log("gocha");
      this.AddPermission();
      this.SaveRole();
    },

    SaveRole() {
      console.log(this.postItem);
      axios
        .post(this.$store.state.baseUrl + "/Roles", this.postItem)
        .then(res => {
          console.log(res);
          this.postItem.permissionRoles = null;
          this.selected = null;
          this.postItem.role = null;
        })
        .catch(err => {
          console.log(err);
          this.postItem.permissionRoles = null;
          this.selected = null;
          this.postItem.role = null;
        });
    },

    AddPermission() {
      for (let i = 0; i < this.selected.length; i++) {
        let item = {
          permissionId: this.selected[i]
        };

        this.postItem.permissionRoles.push(item);
      }

      console.log(this.postItem);
    }
  },

  created() {
    console.log(this.$store.state.baseUrl);

    axios
      .get(this.$store.state.baseUrl + "/Premissions")

      .then(res => {
        const permissionsRes = res.data;

        for (let key in permissionsRes) {
          const permissionRes = permissionsRes[key];

          const permis = {
            id: permissionRes.id,

            permission: permissionRes.permission
          };

          this.permissions.push(permis);
        }

        console.log(this.permissions);
      });
  }
};
</script>

<style>
</style>
