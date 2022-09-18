<script setup lang="ts">
import { ref } from 'vue'
import { Hero } from '../hero'
import Popup from './Popup'

defineProps<{ msg: string }>()

const count = ref(0)
const show = ref(false)
const showPopup = ref(false)
</script>

<template>
  <h1>{{ msg }}</h1>
  <router-link to="/page1">调整page1</router-link>
  <router-link :to="{name:'page2'}">调整page2</router-link>
  <input type="text">
  <div style="width: 100%;height: 320px;">
    <Hero k="hello" :z-index='1001' :duration="600" timing="ease-out">
      <img id="img1" style="width: 150px" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F09%2F20210709142454_dc8dc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665799477&t=d25745b121f521f5f024f18bd1d9771f" />
    </Hero>
    <Hero k="hello2">
      <div style="width: 200px;height: 160px;text-align: center;background: cadetblue;overflow: hidden;">
        <h1>点击</h1>
      </div>
    </Hero>
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <router-view></router-view>
  <button @click="show = true">打开Hero</button>
  <button @click="show = false">关闭Hero</button>
  <button @click="showPopup = true">打开弹窗</button>
  <Popup :show="showPopup" @close='showPopup = false'>
    <h1 style="padding: 30px 0 20px">Hello, Hero</h1>
    <Hero k="hello" :z-index='1001'>
      <img id="img2" style="width: 200px;border-radius: 50%;box-shadow: 0px 0px 50px #000;" src="https://img2.baidu.com/it/u=3189065550,26744168&fm=253&fmt=auto&app=120&f=JPEG?w=804&h=800" />
    </Hero>
    <div style="height: 20px"></div>
    <Hero k="hello2">
      <div style="width: 300px;height: 160px;text-align: center;background: #ccc;border-radius: 20px;overflow: hidden;">
        <div style="display: flex;">
          <img style="width: 160px;flex-shrink: 0;" src="https://img1.baidu.com/it/u=4214748569,1907338618&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="">
          <div>
            <h3>hello,测试</h3>
          </div>
        </div>
      </div>
    </Hero>
  </Popup>
  <div style="width: 100%;height: 250px;text-align: center;">
    <Hero v-if="show" k="hello">
      <img style="width: 250px;border-radius: 50%;box-shadow: 0px 0px 50px #000;" src="https://img2.baidu.com/it/u=3189065550,26744168&fm=253&fmt=auto&app=120&f=JPEG?w=804&h=800" />
    </Hero>
  </div>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
