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
