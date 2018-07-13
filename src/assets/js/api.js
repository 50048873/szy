import $ from 'jquery'
import {baseUrl} from '@/assets/js/config'

// 取水户列表
export let getWrwibList = () => {
  return $.ajax({
    url: baseUrl + '/znb/wrWiuBController/getWrwibList.do'
  })
}

// 取水户详情
export let getUseDailyByStcd = (params) => {
  return $.ajax({
    url: baseUrl + '/znb/useAddDailyController/getUseDailyByStcd.do',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(params)
  })
}

// 水源地列表
export let getWaterList = () => {
  return $.ajax({
    url: baseUrl + '/znb/wrSwsBController/getWaterList.do'
  })
}

// 水源地检测详情
export let getWqAwqmdDByStcd = (params) => {
  return $.ajax({
    url: baseUrl + '/znb/wrSwsBController/getWqAwqmdDByStcd.do',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(params)
  })
}
