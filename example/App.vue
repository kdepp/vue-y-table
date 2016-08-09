<template>
<div>
  <h1>Y Table</h1>
  <y-table
    :fields="fields"
    :tdata="tdata"
  ></y-table>
</div>
</template>

<script>
const redText = {
  template: '<span style="color: red">{{value}}</span>',
  props: ['value', 'id', 'col']
};

export default {
  data: () => ({
    fields: [
      {key: 'first', label: '名', componentName: 'red-text', component: redText},
      {key: 'sur',   label: '姓'}
    ],
    tdata: [
      {_id: 1, first: 'Pratt', sur: 'John'},
      {_id: 2, first: 'Marilyn', sur: 'Monroe'},
      {_id: 3, first: 'Lenon', sur: 'John'},
    ]
  }),

  components: {
    'y-table': require('../src/table.vue')
  }
}
</script>
