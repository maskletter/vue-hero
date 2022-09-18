import { defineComponent } from 'vue'
import { Hero } from '../hero'

export const OtherPage1 = defineComponent(() => {

    return () => <div>
        页面111
        <h1>111</h1>
        <Hero k='hello'>
            <div style={{width: '100px',background: 'red'}}>daowdhjoawhd</div>
        </Hero>
    </div>

})