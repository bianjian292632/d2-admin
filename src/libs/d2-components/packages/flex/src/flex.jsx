import {
  defineComponent,
  computed
} from 'vue'
import {
  pickBy,
  isUndefined
} from 'lodash-es'
import makeClassnames from 'classnames'
import {
  isNumberLike
} from 'd2-utils/number.js'
import {
  makeComponentName,
  makeComponentClassName
} from '../../../utils/name.js'
import {
  isFlexProp
} from '../../../utils/const.js'

const namespace = 'flex'

export const name = makeComponentName(namespace)
export const classname = makeComponentClassName(namespace)

export default defineComponent({
  name,
  props: {
    // display
    inlineFlex: { type: Boolean },
    block: { type: Boolean },
    inline: { type: Boolean },
    inlineBlock: { type: Boolean },
    // flex parent attributes
    wrap: { type: Boolean },
    wrapR: { type: Boolean },
    dir: { type: String, default: '', validator: value => isFlexProp('dir', value, true) },
    main: { type: String, default: '', validator: value => isFlexProp('main', value, true) },
    cross: { type: String, default: '', validator: value => isFlexProp('cross', value, true) },
    box: { type: String, default: '', validator: value => isFlexProp('box', value, true) },
    content: { type: String, default: '', validator: value => isFlexProp('content', value, true) },
    // flex child attributes
    order: { type: [String, Number], validator: value => isNumberLike(value) },
    grow: { type: [String, Number], validator: value => isNumberLike(value) },
    shrink: { type: [String, Number], validator: value => isNumberLike(value) },
    self: { type: String, default: '', validator: value => isFlexProp('self', value, true) },
    // helper
    center: { type: Boolean },
    tag: { type: String, default: 'div' }
  },
  setup (props, { slots }) {
    const center = computed(() => props.center ? 'center' : '')
    const main = computed(() => center.value || props.main)
    const cross = computed(() => center.value || props.cross)
    const classnames = computed(() => makeClassnames(
      classname,
      {
        'is-inline-flex': props.inlineFlex,
        'is-block': props.block,
        'is-inline': props.inline,
        'is-inline-block': props.inlineBlock,
        'is-wrap': props.wrap,
        'is-wrap-r': props.wrapR,
        [`is-dir-${props.dir}`]: props.dir,
        [`is-main-${main.value}`]: main.value,
        [`is-cross-${cross.value}`]: cross.value,
        [`is-box-${props.box}`]: props.box,
        [`is-content-${props.content}`]: props.content,
        [`is-self-${props.self}`]: props.self
      }
    ))
    const style = computed(() => pickBy({
      order: props.order,
      flexGrow: props.grow,
      flexShrink: props.shrink
    }, value => !isUndefined(value)))
    return () =>
      <props.tag class={ classnames.value } style={ style.value }>
        { slots.default?.() }
      </props.tag>
  }
})
