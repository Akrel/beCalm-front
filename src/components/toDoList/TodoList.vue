<template>
  <v-layout row wrap>
    <v-flex id="mainEl" text-xs-center>
      <!-- header -->
      <h1 style="padding-top: 10px" class="primary--text display-3 font-weight-medium my-3">LISTA ZADAŃ</h1>
      <v-card>
        <v-list class="pa-0">
          <v-list-item>

            <v-text-field
                :label="'Nowe zadanie'"
                @keydown.enter="addTodo"
                autofocus
                autocomplete="off"
                clearable
                color="primary"
                text
                hide-details
                maxlength="1023"
                placeholder="Co musi zostać zrobione?"
                solo
                v-model="newTodo"
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-card>
      <!-- main -->
      <v-card class="mt-3" v-show="todos.length">
        <v-progress-linear class="my-0" v-model="progressPercentage"/>
        <v-card-actions class="px-3" v-show="todos.length">
          <span class="primary--text">
            {{ remaining }} {{ remaining | pluralize('item') }} left
          </span>
          <v-spacer></v-spacer>
          <v-btn-toggle
              class="elevation-0"
              mandatory
              v-model="visibility"
              v-show="todos.length"
          >
            <v-btn
                :key="key"
                :to="key"
                :value="key"
                class="mx-0"
                color="primary"
                text
                small
                v-for="(val, key) in filters"
            >
              {{ key | capitalize }}
            </v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-list class="pa-0">
          <template v-for="todo in filteredTodos">
            <v-divider :key="`${todo.uid}-divider`"></v-divider>
            <TodoItem
                :key="todo.uid"
                :todo="todo"
            />
          </template>
        </v-list>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import TodoItem from './TodoItem.vue'
import $ from 'jquery';
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
export default {
  props: ['filter'],
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: '',
      filters: filters,
      visibility: this.filter
    }
  },
  computed: {
    todos() {
      return this.$store.state.taskTodo.todos
    },
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    },
    progressPercentage() {
      const len = this.todos.length
      return ((len - this.remaining) * 100) / len
    }
  },
  methods: {
    addTodo() {
      const text = this.newTodo.trim()
      if (text) {
        this.$store.dispatch('taskTodo/addTodo', text)
      }
      this.newTodo = ''
    },

  },
  created() {
    $(document).ready(function(){
      var newTag = document.getElementsByClassName("elevation-0 v-item-group theme--light v-btn-toggle")[0]
      var arrayTag = newTag.children
      arrayTag[0].innerHTML = " Wszystkie "
      arrayTag[1].innerHTML = " Aktywne "
      arrayTag[2].innerHTML = " Ukończone "

      var itemsTag = document.getElementsByClassName("v-card__actions px-3")[0]
      let spanItem = itemsTag.getElementsByClassName("primary--text")[0];
      let textContent = spanItem.textContent;
      let strings = textContent.split(" ");
      spanItem.innerHTML = " Aktywne zadania " + strings[1]

    });
  },

  mounted() {
    this.created();
    },


  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },

  beforeCreate() {
    this.$store.dispatch('taskTodo/getAll')
  },

  destroyed() {
    this.$store.state.taskTodo.todos = null;
  }
}
</script>

<style>

h1 {
  opacity: 0.3;
}

#mainEl {
  padding-left: 120px !important;
  padding-right: 120px !important;
}

#div-loader > div > div > div:nth-child(2) > div > div > div.v-input.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--placeholder > div > div {
  box-shadow: none !important;
}

</style>
