<template id="qw">
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h7">
            {{this.name}}
          </v-list-item-title>
          <v-list-item-subtitle style="font-size: 15px">{{this.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-treeview
      :items="items"
      :search="search"
      :filter="filter"
      :open.sync="open"
      activatable
      open-on-click
    >
      <template v-slot:prepend="{ item }">
        <v-icon
          v-if="item.children"
          v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
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
    email:"",
    name:"",

    items: [
      {
        id: 2,
        name: "Core team",
        children: [
          {
            id: 201,
            name: "John"
          },
          {
            id: 202,
            name: "Kael"
          },
          {
            id: 203,
            name: "Nekosaur"
          },
          {
            id: 204,
            name: "Jacek"
          },
          {
            id: 205,
            name: "Andrew"
          }
        ]
      },
      {
        id: 3,
        name: "Administrators",
        children: [
          {
            id: 301,
            name: "Mike"
          },
          {
            id: 302,
            name: "Hunt"
          }
        ]
      },
      {
        id: 4,
        name: "Contributors",
        children: [
          {
            id: 401,
            name: "Phlow"
          },
          {
            id: 402,
            name: "Brandon"
          },
          {
            id: 403,
            name: "Sean"
          }
        ]
      }
    ],
    open: [2, 3, 4],
    search: null,
    caseSensitive: false
  }),
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  created() {
    let userJson = JSON.parse(localStorage.getItem('user'));
    this.email = userJson.email;
    this.name = userJson.userName;

  }
};
</script>

<style scoped>
#qw {
  height: 80%;
  width: 30%;
}
</style>
