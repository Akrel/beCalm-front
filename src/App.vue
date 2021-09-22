<template>
  <v-app>
   <calendar-event/>
  </v-app>
</template>

<script>
import CalendarEvent from "./components/activity/Calendar-event";
export default {
  name: "App",

  components: {CalendarEvent}
};
</script>
<style></style>

<style scoped>
v-app {
  overflow: hidden;
  width: 100%;
}
</style>
