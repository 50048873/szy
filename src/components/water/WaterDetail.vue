<template>
  <div class="WaterDetail fullScreen">
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>开始时间</p>
        </div>
        <div class="weui-cell__ft">
          <input class="weui-input" v-model="beginDate" @change="getUseDailyByStcd" type="datetime" value="">
        </div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>结束时间</p>
        </div>
        <div class="weui-cell__ft">
          <input class="weui-input" v-model="endDate" @change="getUseDailyByStcd" type="datetime" value="">
        </div>
      </a>
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="code" @change="getUseDailyByStcd">
            <option value="">取水户</option>
            <option :value="item.code" v-for="item in selectData" :key="item.code">{{item.intNm}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="tab-wrap">
      <hui-tab1 :data="tabData" size="small" @tab-click="tabClick" v-show="tableData.length"></hui-tab1>
      <div class="chart-wrap" v-if="currentIndex === 0 && tableData.length">
        <div class="subTitle">
          <span>日取水量（m<sup>3</sup>）</span>
          <span>累计取水量（万m<sup>3</sup>）：{{sumWater}}</span>
        </div>
        <highcharts-column
          :data="chartData"
          :pointStart="this.beginDate"
        >
        </highcharts-column>
      </div>
      <hui-table1 class="hui-table1-time" :data="tableData" v-if="currentIndex === 1 && tableData.length">
        <hui-table-column prop="time" label="时间"></hui-table-column>
        <hui-table-column prop="value" label="日取水量（m）"></hui-table-column>
      </hui-table1>
    </div>
    <no-data v-if="!tableData.length"></no-data>
  </div>
</template>

<script>
import HighchartsColumn from '@/components/base/HighchartsColumn'
import {getDateStr, handleDecimalLength, getServerErrorMessageAsHtml, padEmptyData, isObject} from '@/assets/js/util'
import * as api from '@/assets/js/api'
import {success, noDataHintTxt} from '@/assets/js/config'
export default {
  name: 'WaterDetail',
  components: {
    HighchartsColumn
  },
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
      beginDate: getDateStr(-7),
      endDate: getDateStr(),
      currentIndex: 0,
      tabData: [
        {
          'title': '图形'
        },
        {
          'title': '表格'
        }
      ],
      tableData: [],
      chartData: [],
      sumWater: 0,
      selectData: [],
      code: ''
    }
  },
  methods: {
    tabClick (item, index) {
      this.currentIndex = index
    },
    getUseDailyByStcd () {
      let params = {
        wiucd: this.id,
        beginDate: this.beginDate.replace('T', ' '),
        endDate: this.endDate.replace('T', ' '),
        code: this.code
      }
      api.getUseDailyByStcd(params)
        .then((res) => {
          if (res.status === success) {
            let data = res.data
            if (isObject(data)) {
              this.sumWater = data.sumWater
              if (Array.isArray(data.wrIntNameList)) {
                this.selectData = data.wrIntNameList
              }
              let useDailyList = data.useDailyList

              if (!Array.isArray(useDailyList)) return
              let convertedRes = []
              useDailyList.forEach((item) => {
                convertedRes.push({
                  time: item.time,
                  value: handleDecimalLength(item.supplyWater)
                })
              })
              let padRes = padEmptyData({
                startTime: this.beginDate,
                endTime: this.endDate,
                data: convertedRes,
                intervalTime: 24 * 60 * 60 * 1000
              })
              this.tableData = convertedRes
              this.chartData = padRes
            } else if (data) {
              this.$message({content: noDataHintTxt, icon: 'hui-warn'})
            }
          } else {
            this.$message({content: res.msg, icon: 'hui-warn'})
          }
        }, (err) => {
          this.$message({content: getServerErrorMessageAsHtml(err, 'Detail.vue->getRiveDetailData'), icon: 'hui-warn'})
        })
    }
  },
  created () {
    this.getUseDailyByStcd()
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
    .highcharts {
      padding-top: 15px;
      padding-bottom: 15px;
      background-color: white;
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
