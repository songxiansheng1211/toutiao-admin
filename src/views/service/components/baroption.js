export function getBarOption (_text, manData, womanData) {
  const countData = manData.map((index, item) => {
    return index + womanData[item]
  })
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
        const count = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#ffffff;"></span>'
        const headcount = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#44CD00;"></span>'
        const average = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#F7B500;"></span>'
        const manNum = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#0091FF;"></span>'
        const womanNum = '<span style="display:inline-block;margin-right:4px;border-radius:6px;width:6px;height:6px;background-color:#FF7C7C;"></span>'
        // 系名称
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          if (params[i].seriesName === '分组总人数') {
            relVal += '<br/>' + count + params[i].seriesName + ' : ' + params[i].value + '<br/>' + headcount + '总人数比:' + parseInt(params[i].value / 2500 * 100) + '%'
          } else if (params[i].seriesName === '男') {
            relVal += '<br/>' + manNum + params[i].seriesName + ' : ' + params[i].value
          } else {
            relVal += '<br/>' + womanNum + params[i].seriesName + ' : ' + params[i].value
          }
        }
        return relVal + '<br/>' + average + '2020全国平均:' + '11%' + '<br/>'
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
    grid: {
      x: 60,
      y: 80,
      x2: 60,
      y2: 60
    },
    legend: {
      bottom: 8,
      right: 16,
      itemWidth: 16,
      itemHeight: 8,
      data: ['男', '女']
    },
    xAxis: [
      {
        type: 'category',
        data: ['尿酸偏高', '血脂偏高', '血压偏高', '血糖偏高', '体重（BMI）偏高'],
        axisPointer: {
          type: 'shadow'
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
        nameTextStyle: {
          padding: [0, 0, 0, -30]
        },
        min: 0,
        max: 2500,
        interval: 500,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '占比（%）',
        nameTextStyle: {
          padding: [0, -55, 0, 0]
        },
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    color: ['#0091FF', '#FF7C7C'],
    series: [
      {
        name: '男',
        stack: 'product',
        type: 'bar',
        barWidth: 20,
        data: manData,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              textStyle: {
                color: '#ffffff',
                fontSize: 8
              }
            }
          }
        }
      },
      {
        name: '女',
        stack: 'product',
        type: 'bar',
        barWidth: 20,
        data: womanData,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              textStyle: {
                color: '#ffffff',
                fontSize: 8
              }
            }
          }
        }
      },
      // 隐藏的总和数据
      {
        name: '分组总人数',
        type: 'bar',
        stack: 'product',
        barGap: '-100%',
        label: {
          normal: {
            textStyle: {
              color: '#666666',
              fontSize: 8
            },
            position: 'insideBottom',
            show: true,
            formatter: (params) => {
              const group = parseInt(params.value / 2500 * 100) + '%'
              return group
            }
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: '#1FBCD2'
          }
        },
        data: countData
      }
    ]
  }
}
