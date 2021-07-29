
export function getRiskOption (_text, _data) {
  return {
    title: {
      text: _text,
      left: 16,
      top: 16,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderWidth: 0,
      formatter: (params) => {
        const numPeople = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#0091FF;"></span>'
        const percent = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#ffffff;"></span>'
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          if (params[i].seriesName === '患者比例') {
            relVal += '<br/>' + percent + params[i].seriesName + ' : ' + parseInt(params[i].value * 100 / 3000) + '%'
          } else {
            relVal += '<br/>' + numPeople + params[i].seriesName + ' : ' + params[i].value
          }
        }
        return relVal
      },
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    color: ['#0091FF'],
    legend: {
      data: ['患者人数'],
      bottom: 8,
      right: 16,
      itemWidth: 16,
      itemHeight: 8
    },
    grid: {
      x: 60,
      y: 80,
      x2: 60,
      y2: 60
    },
    xAxis: [
      {
        type: 'category',
        data: ['尿酸偏高', '疑似糖尿病', '中度高血压', '甘油三酯偏高', '轻度高血压', '血压', '糖尿病较高风险'],
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          fontSize: 12,
          color: '#999999'
        },
        axisLabel: {
          interval: 0
          // 不显示坐标轴样式
        },
        // 不显示x轴坐标样式
        axisLine: {
          show: false
        },
        // 不显示刻度
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位（人）',
        min: 0,
        max: 1500,
        interval: 300,
        nameTextStyle: {
          padding: [0, 0, 0, -30]
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '占比（%）',
        min: 0,
        max: 50,
        interval: 10,
        nameTextStyle: {
          padding: [0, -55, 0, 0]
        },
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '患者人数',
        stack: 'product',
        type: 'bar',
        barWidth: 20,
        data: _data,
        itemStyle: {
        },
        label: {
          normal: {
            textStyle: {
              color: '#ffffff',
              fontSize: 8
            },
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: '患者比例',
        stack: 'product',
        type: 'bar',
        barWidth: 20,
        data: _data,
        label: {
          normal: {
            textStyle: {
              color: '#666666',
              fontSize: 8
            },
            show: true,
            position: 'insideBottom',
            formatter: (params) => {
              const val = params.data
              const percent = parseInt(val * 100 / 3000) + '%'
              return percent
            }
          }
        },
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0
        }
      }
    ]
  }
}
