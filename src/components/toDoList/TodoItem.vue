<template>
  <v-list-item class="todo-item" :class="{ 'editing': editing }">
    <v-list-item-action>
      <v-checkbox
          :input-value="todo.done"
          @change="toggleTo(todo)"
          color="primary"
          v-if="!editing"
      ></v-checkbox>
      <v-icon
          color="primary"
          v-else
      >Edytuj</v-icon>
    </v-list-item-action>
    <template v-if="!editing">
      <v-list-item-content
          :class="{ 'primary--text': todo.done }"
          @dblclick="editing = true"
      >
        {{ todo.text }}
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
            v-on:click="rm(todo)"
            color="red lighten-3"
            text
            icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
    <v-text-field
        :value="todo.text"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        clearable
        color="primary"
        text
        hide-details
        maxlength="1023"
        ref="input"
        solo
        mdi-check
        v-else
        v-focus="editing"
    ></v-text-field>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['todo'],
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          context.$refs.input.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions('taskTodo',[
      'editTodo',
      'removeTodo',
      'toggleTodo'
    ]),
    rm(e){
      this.removeTodo(e)
      this.$store.dispatch('taskTodo/getAll')
    },

    toggleTo(e){
      this.toggleTodo(e.uid.toString())
    },

    doneEdit (e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit () {
      this.editing = false
    }
  }
}
</script>

<style  >
.todo-item .v-list__tile{
  height: auto;

}


editing .v-list__tile{
  height: 48px
}

</style>