<template>
  <v-container fluid>
    <v-layout column>
      <v-btn color="#78909C" dark :to="{name:'StockReport'}">
        <v-icon left>trending_up</v-icon>საქონელი / საწყობი
      </v-btn>
      <v-btn color="#78909C" dark :to="{name:'AccidentReport'}">
        <v-icon left>trending_up</v-icon>ინციდენტები
      </v-btn>
      <v-btn color="#78909C" dark :to="{name:'WhsJournal'}">
        <v-icon left>trending_up</v-icon>ტრანზაქციების ისტორია
      </v-btn>
      <!-- <v-btn color="#78909C" dark :to="{name:'TasksReport'}">
        <v-icon left>trending_up</v-icon>დავალებები
      </v-btn> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
