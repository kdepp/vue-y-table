<script>
import Editable from './editable.vue';

const plainText = {
  template: "<span>{{value}}</span>",
  props: ['value', 'id', 'col', 'update']
};

const checkField = function (field) {
  return field && field.key;
};

const props = {
  // Note: field item should include key, label, component and componentName
  // component and componentName could be omitted and will be filled with plain editable component;
  fields: {
    type: Array,
    required: true
  },
  tdata: {
    type: [Array, Function],
    required: true
  },
  idCol: {
    type: String,
    default: '_id'
  },
  update: {
    type: Function,
    default: function (opts) {
      console.log('onUpdate', opts);
    }
  }
};

const inner = {
  template: `
    <table>
      <thead>
        <tr>
          <td v-for="f in fields">{{f.label}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data">
          <td v-for="f in fields">
            <component
              :is="tcomponents[f.key].cname"
              :value="d[f.key]"
              :col="f.key"
              :id="d[idCol]"
              :extra="{col: f.key, id: d[idCol]}"
              @update="update"
            ></component>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  props: {
    ...props,
    tcomponents: {
      type: Object,
      required: true
    }
  },
  computed: {
    data: function () {
      return this.tdata;
    }
  }
};

const outer = {
  props,
  template: '<div><x-inner :fields="fields" :tdata="tdata" :id-col="idCol" :tcomponents="tcomponents"></x-inner></div>',
  components: {
    'x-inner': function (resolve) {
      let tcs = this.tcomponents;
      let components = Object.keys(tcs).reduce((prev, cur) => {
        return {...prev, [tcs[cur].cname]: tcs[cur].component};
      }, {});

      resolve({...inner, components});
    }
  },
  computed: {
    tcomponents: function () {
      let a = this.fields.reduce((prev, cur) => {
        var cname, component;

        if (cur.componentName && cur.component) {
          cname = cur.componentName;
          component = cur.component;
        } else {
          cname = 'x-plain-editable';
          component = Editable;
        }

        return {
          ...prev,
          [cur.key]: {cname, component}
        };
      }, {});
      console.log('tcomb: ', a);
      return a;
    }
  }
}

export default outer;
</script>
