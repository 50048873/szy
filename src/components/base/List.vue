<template>
  <div class="Water fullScreen">
    <hui-list1
      v-if="isWater"
      class="theme2"
      :data="data"
      theme="HuiList1-theme2"
      @list-click="listClick"
    >
    </hui-list1>
    <ul
      class="waterOrigin"
      v-if="isRain"
    >
      <li class="arrow-r" v-for="(item, index) in data" :key="index" @click="listClick(item)">
        <h6 class="title">{{item.name}}</h6>
        <p>
          <span>管理单位：</span>
          <span>{{item.manUnit}}</span>
        </p>
        <p>
          <span>设计年供水量：</span>
          <span>{{item.dywsW}}</span>
          <span>万m<sup>3</sup></span>
        </p>
        <p>
          <span>水质目标：</span>
          <span>{{item.goal}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import * as api from '@/assets/js/api'
import {success, noDataHintTxt} from '@/assets/js/config'
import {loading, handleDecimalLength, getServerErrorMessageAsHtml} from '@/assets/js/util'
export default {
  name: 'Water',
  data () {
    return {
      data: [],
      isWater: false,
      isRain: false
    }
  },
  beforeRouteLeave (to, from, next) {
    loading.remove()
    next()
  },
  methods: {
    listClick (item) {
      const parentPath = this.$route.path
      const name = this.$route.name
      switch (name) {
        case 'water':
          this.$router.push({path: `${parentPath}/${item.wiucd}`, query: {title: item.title}})
          break
        case 'waterOrigin':
          this.$router.push({path: `${parentPath}/${item.stcd}`, query: {title: item.name}})
          break
      }
    },
    handleType () {
      const name = this.$route.name
      switch (name) {
        case 'water':
          this.getWrwibList()
          this.isWater = true
          break
        case 'waterOrigin':
          this.getWaterList()
          this.isRain = true
          break
      }
    },
    getWrwibList () {
      api.getWrwibList()
        .then((res) => {
          if (res.status === success) {
            let data = res.data
            if (Array.isArray(data)) {
              this.data = this.convertWrwibList(data)
            } else if (data) {
              this.$message({content: noDataHintTxt, icon: 'hui-warn'})
            }
          } else {
            this.$message({content: res.msg, icon: 'hui-warn'})
          }
        }, (err) => {
          this.$message({content: getServerErrorMessageAsHtml(err, 'List.vue->getWrwibList'), icon: 'hui-warn'})
        })
    },
    getWaterList () {
      api.getWaterList()
        .then((res) => {
          if (res.status === success) {
            let data = res.data
            if (Array.isArray(data)) {
              this.data = data
            } else if (data) {
              this.$message({content: noDataHintTxt, icon: 'hui-warn'})
            }
          } else {
            this.$message({content: res.msg, icon: 'hui-warn'})
          }
        }, (err) => {
          this.$message({content: getServerErrorMessageAsHtml(err, 'List.vue->getWaterList'), icon: 'hui-warn'})
        })
    },
    convertWrwibList (data) {
      let res = []
      data.forEach((item) => {
        let obj = {
          children: []
        }
        obj.wiucd = item.wiucd
        obj.title = item.wiunm ? item.wiunm.trim() : ''
        obj.status = item.warnType
        obj.children.push({
          title: '年度取水量',
          value: item.supplyWater ? handleDecimalLength(item.supplyWater) : '--',
          unit: '万m<sup>3</sup>'
        })
        obj.children.push({
          title: '年计划用水',
          value: item.planWater ? handleDecimalLength(item.planWater) : '--',
          unit: '万m<sup>3</sup>'
        })
        res.push(obj)
      })
      return res
    }
  },
  created () {
    this.handleType()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.Water {
  .HuiList1-theme2.theme2 {
    li {
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  .iconExplain {
    width: 30px;
    height: 30px;
    fill: white;
  }
  .waterOrigin {
    li {
      margin: 10px 15px;
      padding: 10px 15px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      .title {
        font-weight: bold;
        font-size: 16px;
        padding-bottom: 2px;
      }
      p {
        line-height: 1.5;
      }
      &:after {
        right: 15px;
      }
    }
  }
}
</style>
