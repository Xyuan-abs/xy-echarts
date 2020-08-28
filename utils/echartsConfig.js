// import { numBaseConversion } from "@/utils/numberCommon";

// const unitMap = {
//   bytes: [
//     { label: 'B', value: 1 },
//     { label: 'K', value: Math.pow(1024, 1) },
//     { label: 'M', value: Math.pow(1024, 2) },
//     { label: 'G', value: Math.pow(1024, 3) },
//     { label: 'T', value: Math.pow(1024, 4) },
//   ],
//   'bytes/second': [
//     { label: 'B/s', value: 1 },
//     { label: 'K/s', value: Math.pow(1024, 1) },
//     { label: 'Mb/s', value: Math.pow(1024, 2) },
//     { label: 'G/s', value: Math.pow(1024, 3) },
//     { label: 'T/s', value: Math.pow(1024, 4) },
//   ],
// }

export function optionsLineBase(unit) {
  return {
    /* title */
    title: {
      show: false,
      textStyle: {
        fontSize: 12,
        color: '#8996a9',
        fontWeight: '500',
      },
      rotate: -90,
      top: 8,
      left: 3,
    },
    /* grid */
    grid: {
      left: 15,
      right: 35,
      top: 45,
      bottom: 10,
      containLabel: true,
    },
    /* legend */
    legend: {
      show: true,
      type: 'scroll',
      itemWidth: 18,
      width: '100%',
      top: 8,
      left: 'center',
      textStyle: {
        color: '#8996a9',
      },
      selectedMode: true,
      selected: [],
      data: [],
    },
    /* tooltip */
    tooltip: {
      axisPointer: {
        type: 'none',
      },
      textStyle: {
        align: 'left',
      },
      padding: 10,
      backgroundColor: 'rgba(51,51,51,0.98)',
    },
    /* xAxis */
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#8996a9',
        margin: 10,
        lineHeight: 14,
        formatter(params) {
          if (params.length > 7) {
            return params.substring(0, 7) + '\n' + params.substring(7)
          } else {
            return params
          }
        },
      },
      data: [],
    },
    /* yAxis */
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#8996a9',
          formatter(val) {
            return getyUnit(val, unit)
          },
        },
        splitLine: {
          lineStyle: {
            color: '#efefef',
          },
        },
      },
      {
        type: 'value',
        nameTextStyle: {
          color: '#8996a9',
          align: 'center',
        },
        nameLocation: 'center',
        nameRotate: 90,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
  }
}

/* 格式化y轴值显示 */
export function getyUnit(val) {
  // let unitName = unit.split(/:|：/)[1]
  // let unitMapResult = unitMap[unitName]

  // if (unitMapResult) {
  //   return numBaseConversion(val, unitMapResult, 0);
  // } else {
  //   return val;
  // }

  return val
}

let itemFormatter = () => {
  /* 当tooltip的trigger为item时 */
  return null
}
let axisFormatter = () => {
  return null
}

/**
 * 获取tooltip的默认formatter
 * @param {String} trigger
 */
export function getTooltipFmt(trigger) {
  let formatter = null
  if (trigger === 'item') {
    formatter = itemFormatter()
  } else if (trigger === 'axis') {
    formatter = axisFormatter()
  }
  return {
    formatter,
  }
}
