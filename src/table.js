import Editable from './editable.vue';

var normalize = function (text) {
  return text.split('').slice(1).reduce((prev, cur) => {
    if (cur >= 'A' && cur <= 'Z') return prev + '-' + cur.toLowerCase();
    else return prev + cur;
  }, text.charAt(0));
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
  tableClass: {
    type: String,
    default: ''
  },
  isEditable: {
    type: Boolean,
    default: true
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
    <table :class="tableClass">
      <thead>
        <tr>
          <th v-for="f in fields">{{f.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data">
          <td v-for="f in fields">
            <component
              :is="tcomponents[$index].cname"
              :options="tcomponents[$index].options"
              :value="d[f.key] || ''"
              :col="f.key"
              :id="d[idCol]"
              :extra="{col: f.key, id: d[idCol]}"
              :is-editable="isEditable"
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
      type: Array,
      required: true
    }
  },
  computed: {
    data: function () {
      return this.tdata;
    }
  }
};

let innerUid = 0;

const outer = () => {
  var innerName = 'x-inner-' + (innerUid ++);

  return {
    props: {...props},
    template: (function () {
      var propStr = Object.keys(props).concat(['tcomponents']).map(text => {
        return `:${normalize(text)}="${text}"`;
      }).join(' ');

      return `<div><${innerName} ${propStr}></${innerName}></div>`
    })(),
    components: {
      [innerName]: function (resolve) {
        let tcs = this.tcomponents;
        let components = tcs.reduce((prev, cur) => {
          return {...prev, [cur.cname]: cur.component};
        }, {});

        resolve({...inner, components});
      }
    },
    computed: {
      tcomponents: function () {
        return this.fields.map(cur => {
          var cname, component;

          if (cur.componentName && cur.component) {
            cname = cur.componentName;
            component = cur.component;
          } else {
            cname = 'x-plain-editable';
            component = Editable;
          }

          return {
            options: cur.options,
            cname, component
          };
        });
      }
    }
  };
};

export default outer;
