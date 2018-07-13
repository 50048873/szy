<template>
  <div class="WaterDetail fullScreen">
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>年月</p>
        </div>
        <div class="weui-cell__ft">
          <input class="weui-input" v-model="date" @change="getWqAwqmdDByStcd" type="month">
        </div>
      </a>
    </div>
    <div class="tab-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>检测指标</th>
            <th>指标值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>水温</td>
            <td>{{data.wt}}</td>
          </tr>
          <tr>
            <td>pH值</td>
            <td>{{data.ph}}</td>
          </tr>
          <tr>
            <td>电导率</td>
            <td>{{data.cond}}</td>
          </tr>
          <tr>
            <td>浊度</td>
            <td>{{data.turb}}</td>
          </tr>
          <tr>
            <td>溶解氧</td>
            <td>{{data.dox}}</td>
          </tr>
          <tr>
            <td>高锰酸盐指数</td>
            <td>{{data.codmn}}</td>
          </tr>
          <tr>
            <td>化学需氧量</td>
            <td>{{data.codcr}}</td>
          </tr>
          <tr>
            <td>总氮</td>
            <td>{{data.tn}}</td>
          </tr>
          <tr>
            <td>氨氮</td>
            <td>{{data.nh3n}}</td>
          </tr>
          <tr>
            <td>亚硝酸盐氮</td>
            <td>{{data.no2}}</td>
          </tr>
          <tr>
            <td>硝酸盐氮</td>
            <td>{{data.no3}}</td>
          </tr>
          <tr>
            <td>总磷</td>
            <td>{{data.tp}}</td>
          </tr>
          <tr>
            <td>总有机碳</td>
            <td>{{data.toc}}</td>
          </tr>
          <tr>
            <td>挥发酚</td>
            <td>{{data.vlph}}</td>
          </tr>
          <tr>
            <td>叶绿素a</td>
            <td>{{data.chla}}</td>
          </tr>
          <tr>
            <td>氟化物</td>
            <td>{{data.f}}</td>
          </tr>
          <tr>
            <td>砷</td>
            <td>{{data.ars}}</td>
          </tr>
          <tr>
            <td>汞</td>
            <td>{{data.hg}}</td>
          </tr>
          <tr>
            <td>六价铬</td>
            <td>{{data.cr6}}</td>
          </tr>
          <tr>
            <td>铜</td>
            <td>{{data.cu}}</td>
          </tr>
          <tr>
            <td>铅</td>
            <td>{{data.pb}}</td>
          </tr>
          <tr>
            <td>镉</td>
            <td>{{data.cd}}</td>
          </tr>
          <tr>
            <td>锌</td>
            <td>{{data.zn}}</td>
          </tr>
          <tr>
            <td>锑</td>
            <td>{{data.sb}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-if="!data.wt"></no-data>
  </div>
</template>

<script>
import {getServerErrorMessageAsHtml, isObject} from '@/assets/js/util'
import * as api from '@/assets/js/api'
import {success, noDataHintTxt} from '@/assets/js/config'
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
      date: this.getYearMonth(),
      data: {}
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
        date: this.date
      }
      api.getWqAwqmdDByStcd(params)
        .then((res) => {
          if (res.status === success) {
            let data = res.data
            console.log(res)
            if (isObject(data)) {
              this.data = data
            } else if (data) {
              this.$message({content: noDataHintTxt, icon: 'hui-warn'})
            }
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
            width: 50%;
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
