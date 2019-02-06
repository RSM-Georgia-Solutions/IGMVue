<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2 sm6 mt-3 lg8>
      <v-text-field label="როლი" placeholder="როლი" v-model="role.role" disabled></v-text-field>
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
  </v-layout>
</template>

<script>
export default {
  props: ["id"],
  created() {
    this.axios
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

    this.axios
      .get(this.$store.state.baseUrl + "/Roles/" + this.$route.params.id)
      .then(res => {
        this.role = res.data;
        const permissions = res.data.permissions;
        console.log(permissions);
        for (let key in permissions) {
          const per = permissions[key];
          //   console.log(per);
          this.selected.push(per.id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      selected: [],
      permissions: [],
      role: {},
      postItem: {
        id: { type: Number },
        role: "",
        permissionRoles: []
      }
    };
  },
  methods: {
    sendreq() {
      this.AddPermission();
      this.SaveRole();
    },
    AddPermission() {
      for (i = 0; i < this.selected.length; i++) {
        let item = {
          permissionId: this.selected[i]
        };

        this.postItem.permissionRoles.push(item);
      }
      this.postItem.id = this.$route.params.id;
      console.log(this.postItem);
    },
    SaveRole() {
      console.log(this.postItem);
      this.axios
        .put(this.$store.state.baseUrl + "/Roles", this.postItem)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
