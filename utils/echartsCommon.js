export const dataZoom = [
  {
    show: true,
    height: 11,
    // xAxisIndex: [0],
    bottom: 20,
    start: 0,
    end: 100,
    startValue: 0,
    endValue: 100,
    minSpan: 10,
    color: '#fff',
    backgroundColor: '#f3f5f6',
    fillerColor: '#dcdcdc',
    textStyle: false,
    handleIcon:
      'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '120%',
    handleStyle: {
      color: '#dcdcdc',
    },
    showDataShadow: false,
    // textStyle: {
    //   color: '#fff'
    // },
    borderColor: '#fff',
    xAxisIndex: [0, 1],
    // yAxisIndex: [0, 1]
  },
  {
    show: false,
    height: 11,
    // xAxisIndex: [0],
    bottom: 29,
    start: 0,
    end: 100,
    startValue: 0,
    endValue: 100,
    minSpan: 10,
    color: '#fff',
    textStyle: false,
  },
  // 内部鼠标,滚动缩放
  // {
  //   type: 'inside',
  //   show: true,
  //   height: 22
  //   // xAxisIndex: [0]
  //   // start: 10,
  //   // end: 35
  // }

  // {
  //   type: 'inside',
  //   bottom: 30
  // },
  // {
  //   type: 'slider'
  // }
]
// 颜色表
export const colors = [
  '#0885ff',
  '#ff9c26',
  '#00CEA6',
  '#FF665E',
  '#1dcf2f',
  '#fe7dea',
  '#40b4fd',
  '#ff665e',
  '#546cff',
  '#ebcb5c',
  '#00bd98',
  '#ab67ff',
  '#219173',
  '#ff5722',
  '#4e97b2',
  '#ff71b4',
  '#43a047',
  '#db3c37',
  '#9ea2ab',
  '#2b7aab',
  '#00bcd4',
  '#7681EB',
]

// 折线图
export const seriesLine = {
  name: '序列1',
  type: 'line',
  data: [],
  symbolSize: 0,
  lineStyle: {
    width: 2,
  },
  areaStyle: {},
}

// 柱状图
export const seriesBar = {
  type: 'bar',
  data: [],
  itemStyle: {},
  label: {},
}

// 堆叠柱状图
export const seriesScatter = {
  type: 'scatter',
  data: [],
  itemStyle: {},
  label: {},
}

//
export const seriesBoxplot = {
  type: 'boxplot',
  data: [],
  itemStyle: {},
  label: {},
}
