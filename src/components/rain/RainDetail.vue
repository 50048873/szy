<template>
  <div class="WaterDetail fullScreen">
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>年月</p>
        </div>
        <div class="weui-cell__ft">
          <input class="weui-input" v-model="time" @change="getWqAwqmdDByStcd" type="month">
        </div>
      </a>
    </div>
    <div class="tab-wrap">
      <table class="table" v-if="isHasData">
        <thead>
          <tr>
            <th>检测指标</th>
            <th>指标值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>水温（℃）</td>
            <td>{{data.wt}}</td>
          </tr>
          <tr>
            <td>pH值</td>
            <td>{{data.ph}}</td>
          </tr>
          <tr>
            <td>电导率（μS/cm）</td>
            <td>{{data.cond}}</td>
          </tr>
          <tr>
            <td>浊度（度）</td>
            <td>{{data.turb}}</td>
          </tr>
          <tr>
            <td>溶解氧（mg/L）</td>
            <td>{{data.dox}}</td>
          </tr>
          <tr>
            <td>高锰酸盐指数（mg/L）</td>
            <td>{{data.codmn}}</td>
          </tr>
          <tr>
            <td>化学需氧量（mg/L）</td>
            <td>{{data.codcr}}</td>
          </tr>
          <tr>
            <td>总氮（mg/L）</td>
            <td>{{data.tn}}</td>
          </tr>
          <tr>
            <td>氨氮（mg/L）</td>
            <td>{{data.nh3n}}</td>
          </tr>
          <tr>
            <td>亚硝酸盐氮（mg/L）</td>
            <td>{{data.no2}}</td>
          </tr>
          <tr>
            <td>硝酸盐氮（mg/L）</td>
            <td>{{data.no3}}</td>
          </tr>
          <tr>
            <td>总磷（mg/L）</td>
            <td>{{data.tp}}</td>
          </tr>
          <tr>
            <td>总有机碳（mg/L）</td>
            <td>{{data.toc}}</td>
          </tr>
          <tr>
            <td>挥发酚（mg/L）</td>
            <td>{{data.vlph}}</td>
          </tr>
          <tr>
            <td>叶绿素a（mg/L）</td>
            <td>{{data.chla}}</td>
          </tr>
          <tr>
            <td>氟化物（mg/L）</td>
            <td>{{data.f}}</td>
          </tr>
          <tr>
            <td>砷（mg/L）</td>
            <td>{{data.ars}}</td>
          </tr>
          <tr>
            <td>汞（mg/L）</td>
            <td>{{data.hg}}</td>
          </tr>
          <tr>
            <td>六价铬（mg/L）</td>
            <td>{{data.cr6}}</td>
          </tr>
          <tr>
            <td>铜（mg/L）</td>
            <td>{{data.cu}}</td>
          </tr>
          <tr>
            <td>铅（mg/L）</td>
            <td>{{data.pb}}</td>
          </tr>
          <tr>
            <td>镉（mg/L）</td>
            <td>{{data.cd}}</td>
          </tr>
          <tr>
            <td>锌（mg/L）</td>
            <td>{{data.zn}}</td>
          </tr>
          <tr>
            <td>锑（mg/L）</td>
            <td>{{data.sb}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-if="!isHasData"></no-data>
  </div>
</template>

<script>
import {getServerErrorMessageAsHtml} from '@/assets/js/util'
import * as api from '@/assets/js/api'
import {success} from '@/assets/js/config'
export default {
  name: 'RainDetail',
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      time: this.getYearMonth(),
      data: {}
    }
  },
  computed: {
    isHasData () {
      if (this.data) {
        return Object.keys(this.data).length
      }
      return false
    }
  },
  methods: {
    getYearMonth () {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, 0)
      return `${year}-${month}`
    },
    getWqAwqmdDByStcd () {
      let params = {
        stcd: this.id,
        time: this.time
      }
      api.getWqAwqmdDByStcd(params)
        .then((res) => {
          if (res.status === success) {
            let data = res.data
            this.data = data
          } else {
            this.$message({content: res.msg, icon: 'hui-warn'})
          }
        }, (err) => {
          this.$message({content: getServerErrorMessageAsHtml(err, 'Detail.vue->getWqAwqmdDByStcd'), icon: 'hui-warn'})
        })
    }
  },
  created () {
    this.getWqAwqmdDByStcd()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/variable.less';
.WaterDetail {
  .weui-cells {
    margin-top: -1px;
  }
  .tab-wrap {
    margin: @margin-primary;
    .table {
      width: 100%;
      text-align: center;
      background-color: white;
      font-size: 12px;
      thead {
        tr {
          th {
            background-color: #99d6f5;
          }
          th:first-child {
            width: 60%;
          }
        }
      }
      tr {
        td {
          p {
            line-height: 1.5;
          }
        }
        th, td {
          border: 1px solid #d7d7d7;
          padding: 6px 0;
        }
        th:first-child, td:first-child {
          position: relative;
          background-color: #1ca1e6;
          color: white;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: -1px;
            width: 3px;
            height: 100%;
            background-color: white;
          }
        }
      }
    }
  }
  .chart-wrap {
    padding-top: 10px;
    background-color: white;
    .subTitle {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      margin-top: 5px;
    }
  }
}
</style>
