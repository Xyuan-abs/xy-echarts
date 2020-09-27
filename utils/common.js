/**
 * 获取数组最大值
 * @param {Array} arr
 */
export function fmtUnit(unit) {
  return unit?.split(/:|：/)?.[1] ?? ''
}

/**
 * 获取数组最大值
 * @param {Array} arr
 */
export function calMax(arr) {
  let max = 0
  arr.forEach(d => {
    if (d.name === 'hidden') return false
    d.data.forEach(v => {
      if (v.value || v.value === 0) {
        if (max < v.value) {
          max = Number(v.value)
        }
      }
    })
  })
  const maxint = Math.ceil(max / 9.5) // 不让最高的值超过最上面的刻度
  const maxval = maxint * 10 // 让显示的刻度是整数
  return maxval
}

/**
 * 获取数组最小值
 * @param {Array} arr
 */
export function calMin(arr) {
  let min = 0
  arr.forEach(d => {
    if (d.name === 'hidden') return false
    d.data.forEach(v => {
      if (!(v.value === undefined || v.value === '')) {
        if (min > v.value) {
          min = Number(v.value)
        }
      }
    })
  })
  const minint = Math.floor(min / 10)
  const minval = minint * 10 // 让显示的刻度是整数
  return minval
}

/**
 * 给颜色加透明度
 * @param {String} color
 * @param {Number} opacity
 */
export function setColorOpacity(color, opacity) {
  if (opacity > 1 || opacity < 0) {
    console.error('opacity should be between 0~1')
    return color
  }
  let result = ''
  if (color.startsWith('#')) {
    /* 透明度转换成二进制 */
    let opacityStr = parseInt(255 * opacity).toString(16)
    /* 颜色加透明度 */
    result = color + opacityStr
  } else if (color.startsWith('rgb(') || color.startsWith('hsl(')) {
    let arr = color.split(/\(|\)/g)
    result = `${arr[0]}a(${arr[1]}, ${opacity})`
  } else {
    result = color
  }

  return result
}

import ECharts from 'vue-echarts'

/**
 * 设置颜色
 * @param {String|Array} color
 * @param {String} type
 * @param {Array} derection [0, 0, 0, 1] 左 上 右 下
 */
export function setColor(color, type = 'Linear', derection = [0, 0, 0, 1]) {
  const colorArr = Array.isArray(color) ? color : [color, color]
  if (type === 'Linear') {
    return new ECharts.graphic.LinearGradient(...derection, [
      {
        offset: 0,
        color: colorArr[0],
      },
      {
        offset: 1,
        color: colorArr[1],
      },
    ])
  } else if (type === 'Radial') {
    return new ECharts.graphic.RadialGradient(0.4, 0.3, 1, [
      {
        offset: 0,
        color: colorArr[0],
      },
      {
        offset: 1,
        color: colorArr[1],
      },
    ])
  } else {
    return Array.isArray(color) ? color[0] : color
  }
}

/**
 * 格式化日期
 * yyyy-MM-dd hh:mm:ss.S
 * yyyy-M-d h:m:s.S
 * @param {Date} dateValue date
 * @param {String} fmt yyyy-MM-dd hh:mm:ss.S
 * @return {String} dateStr
 */
export function format(dateValue, fmt) {
  if (fmt === undefined) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  let date = new Date(dateValue)

  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
