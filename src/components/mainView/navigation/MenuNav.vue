<template id="qw">
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item link>
        <v-list-item-content id="content-user">
          <v-list-item-title class="text-h7">
            {{ this.name }}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 15px">{{ this.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-treeview
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
        activatable
        open-on-click
        @update:active="onOpen"
    >
      <template v-slot:prepend="{ item }">
        <v-icon id="icon-style"
                v-text="item.icon"
        ></v-icon>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "MenuNav",

  //https://vuetifyjs.com/en/components/treeview/#selectable-icons
  data: () => ({
        email: "",
        name: "",
        active: [],
        items: [
          {
            id: 1,
            name: "Calendar",
            icon: "mdi-calendar"
          },
          {
            id: 2,
            name: "Todo List",
            icon: "mdi-format-list-checks"
          },

        ],
        open: [1, 2],
        search: null,
        caseSensitive: false
      }
  ),


  methods: {
    onOpen(item) {


      switch (item[0]) {
        case 1:
          this.$router.push("/calendar")
          break;
        case 2:
          this.$router.push("/toList")
          break;
      }
    }
  }
  ,
  computed: {
    filter() {
      return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined;
    }
  }
  ,
  created() {
    let userJson = JSON.parse(localStorage.getItem('user'));
    this.email = userJson.email;
    this.name = userJson.userName;

  }
  ,


}
;
</script>

<style scoped>
#qw {
  height: 80%;
  width: 30%;
}

#icon-style {
  float: left;
  margin-right: 20px;
}

#content-user {
  padding: 5px;
}
</style>
