<template>
  <v-toolbar id="main-div">
    <v-btn
        id="but"
        class="mr-1"
        color="white"
        outlined
        v-on:click="logout()"
    >
      Wyloguj się
    </v-btn>

  </v-toolbar>
</template>

<script>
export default {
  name: "TopMenuBar",
  data: () => ({}),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout")
          .then(() => {
            this.$router.go(0);
          })
    }
  }
};
</script>

<style scoped>
#main-div {
  width: 100%;
  height: 1%;
  background-color: #4b698f;
  float: right;
}

#but {
  float: right;
  margin-left: auto;
}
</style>
