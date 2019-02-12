<template>
  <v-container fluid>
    <v-layout column>
      <v-btn
        v-if="checkGroupPer()"
        color="#78909C"
        dark
        class="mt-5"
        :to="{name:'Groups'}"
      >დავალებები</v-btn>

      <v-btn
        v-if=" checkPlannedWorksPer() && checkUsersPer() && checkTasksPer()"
        color="#78909C"
        class="mt-4"
        dark
        :to="{name:'NewAccident'}"
      >ინციდენტის დამატება</v-btn>

      <v-btn
        v-if="checkAccidentPer()"
        color="#78909C"
        dark
        class="mt-4"
        :to="{name:'OpenAccidents'}"
      >ღია ინციდენტები</v-btn>

      <v-btn
        v-if="checkPlannedWorksPer()"
        color="#78909C"
        dark
        class="mt-4"
        :to="{name:'PlannedWorks'}"
      >გეგმიური სამუშაოები</v-btn>

      <v-btn color="#78909C" dark class="mt-4" :to="{name:'Inventory'}">მარაგები/საწყობები</v-btn>

      <v-btn
        v-if="checkVendorsPer()"
        color="#78909C"
        dark
        class="mt-4"
        :to="{name:'Vendors'}"
      >ვენდორები</v-btn>

      <v-btn color="#78909C" class="mt-4" :to="{name:'Report'}" dark>რეპორტები</v-btn>

      <v-btn
        v-if="checkUsersPer()"
        color="#78909C"
        dark
        class="mt-4"
        :to="{name:'Users'}"
      >მომხმარებლები</v-btn>

      <v-btn
        v-if="checkRolesPer() && checkPermissionsPer()"
        color="#78909C"
        class="mt-4"
        :to="{name:'Autorizations'}"
        dark
      >ავტორიზაციები</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    // this.axios
    //   .get(this.$store.state.baseUrl + "/Users")
    //   .then(res => {})
    //   .catch(error => {});
    this.axios
      .get(this.$store.state.baseUrl + "/Helper/GetUserPermissions")
      .then(res => {
        const claimsRes = res.data;
        for (let key in claimsRes) {
          var claim = claimsRes[key];
          this.Claims.push(claim);
        }
        console.log(this.Claims);
      })
      .catch(error => {});
  },

  data() {
    return {
      Claims: []
    };
  },

  methods: {
    checkGroupPer() {
      if (this.Claims.includes("CanReadGroups")) {
        return true;
      } else {
        return false;
      }
    },
    checkAccidentPer() {
      if (this.Claims.includes("CanReadAccidents")) {
        return true;
      } else {
        return false;
      }
    },
    checkPlannedWorksPer() {
      if (this.Claims.includes("CanReadPlannedWorks")) {
        return true;
      } else {
        return false;
      }
    },
    checkUsersPer() {
      if (this.Claims.includes("CanReadUsers")) {
        return true;
      } else {
        return false;
      }
    },

    checkTasksPer() {
      if (this.Claims.includes("CanReadTasks")) {
        return true;
      } else {
        return false;
      }
    },
    checkVendorsPer() {
      if (this.Claims.includes("CanReadVendors")) {
        return true;
      } else {
        return false;
      }
    },
    checkRolesPer() {
      if (this.Claims.includes("CanReadRoles")) {
        return true;
      } else {
        return false;
      }
    },
    checkPermissionsPer() {
      if (this.Claims.includes("CanReadPermissions")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
