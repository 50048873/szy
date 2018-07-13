<template>
  <div>
    <iframe v-if="baseUrl === '/api'" src="http://www.whdse.cn:56011/cas-server/login?service=http%3A%2F%2F10.100.50.187%3A8081%2Fznb%2FwrWiuBController%2FgetWrwibList.do%3Bjsessionid%3D1C258250D04D7520F584AF2699C574E0" frameborder="0"></iframe>
    <hui-routerview-slide></hui-routerview-slide>
  </div>
</template>

<script>
import {loading} from '@/assets/js/util'
import $ from 'jquery'
export default {
  name: 'App',
  methods: {
    initAjaxLoading () {
      $.ajaxSetup({
        beforeSend: function (XMLHttpRequest) {
          loading.show()
        },
        complete: function () {
          loading.remove()
        }
      })
    }
  },
  created () {
    this.initAjaxLoading()
    this.baseUrl = process.env.API_HOST
  }
}
</script>

<style scoped lang="less">
  iframe {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    border: 1px solid;
    box-sizing: border-box;
  }
</style>
