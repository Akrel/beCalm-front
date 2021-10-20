<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>


import EventBus from "./commons/event-bus";

export default {
  name: "App",

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
</script>

<style scoped>
v-app {
  overflow: hidden;
  width: 100%;
}
</style>
