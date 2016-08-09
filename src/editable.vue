<style>

</style>

<template>

<div>
  <input type="text" v-show='isEditable && isEditing' :placeholder='input_placeholder' v-model='value' lazy
        v-on:keyup.esc="onUpdate" v-on:keyup.enter="onUpdate"/>
  <span v-on:click="onEdit" v-show='!(isEditable && isEditing)' >
    <span v-if='value && value.length'>{{value}}</span>
    <span v-else>{{text_placeholder}}</span>
  </span>
</div>

</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    col: {
      type: String
    },
    isEditable: {
      type: Boolean,
      default: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    extra: {
      type: Object,
      default: {}
    }
  },

  computed: {
    input_placeholder: function () {
      return 'Enter ' + (this.col || 'here');
    },
    text_placeholder: function () {
      return 'N/A';
    },
  },

  methods: {
    onUpdate: function () {
      this.isEditing = false;
      this.$dispatch('update', {
        ...this.extra,
        value: this.value
      });
    },
    onEdit: function () {
      this.isEditing = true;
      this.$nextTick(function () {
        this.$el.querySelector('input').focus();
      })
    }
  }
}
</script>
