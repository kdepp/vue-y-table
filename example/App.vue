<style>
.fixed-table {
  table-layout: fixed;
  width: 500px;
}
</style>

<template>
<div>
  <h1>Y Table</h1>
  <y-table
    table-class="fixed-table"
    :fields="fields"
    :tdata="tdata"
  ></y-table>
</div>
</template>

<script>
import Table from '../src/table';

const redText = {
  template: '<span style="color: red" @click="onClick">{{value}}</span>',
  props: ['value', 'id', 'col', 'options'],
  computed: {
    onClick: function () {
      return (
        (this.options || {}).onClick
        || function () { alert(self.value) }
      ).bind(this);
    }
  }
};

export default {
  data: () => ({
    fields: [
      {
        key: 'first',
        label: '名',
        componentName: 'red-text',
        component: redText,
        options: {
          onClick: function () {
            console.log(this.value);
          }
        },
        style: { width: '40%'}
      },
      {key: 'first', label: 'first name', style: { width: '20%' }},
      {key: 'sur',   label: '姓', style: { width: '40%' }}
    ],
    tdata: [
      {_id: 1, first: 'Pratt', sur: 'John'},
      {_id: 2, first: 'Marilyn', sur: 'Monroe'},
      {_id: 3, first: 'Lenon', sur: 'John'},
    ]
  }),

  components: {
    'y-table': Table()
  }
}
</script>
