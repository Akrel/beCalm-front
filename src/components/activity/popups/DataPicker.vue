<template>
  <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "Data-Picker",
  props: {label: {required: true, type: String},},
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

      menu2: false
    };
  }

};
</script>

<style scoped></style>
