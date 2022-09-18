import { defineComponent } from 'vue'

const Popup = defineComponent((props, ctx) => {
    return () => props.show ? <div style={{
        position: 'fixed',
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
        zIndex: 999,
        background: 'rgba(0,0,0,0.6)'
    }} onClick={() => ctx.emit('close')}>
        <div style={{
            position: 'absolute',
            width: '400px',
            paddingBottom: '30px',
            "padding-left": '20px',
            right: '20px',
            bottom: '20px',
            background: 'white',
            borderRadius: '20px'
        }}>{ctx.slots.default && ctx.slots.default()}</div>
    </div> : false
})
Popup.props = {
    show: Boolean
}
export default Popup