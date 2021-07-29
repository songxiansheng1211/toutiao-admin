export function getPieOption (_text, _data) {
  return {
    title: {
      text: _text,
      left: 16,
      top: 16,
      textStyle: {
        fontSize: 16
      }
    },
    color: ['#0091FF', '#E8F0F0'],
    tooltip: {
      show: false,
      trigger: 'item'
    },
    legend: {
      top: '50%',
      left: '50%',
      itemGap: 16,
      itemWidth: 16,
      itemHeight: 8,
      orient: 'vertical'
    },
    series: [
      {
        name: '完成率',
        type: 'pie',
        silent: false,
        hoverAnimation: false,
        radius: ['33%', '40%'],
        center: ['30%', '55%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: function () {
              const total = _data.reduce((pre, cur) => {
                pre += cur.value
                return pre
              }, 0)
              const showRatioValue = _data.find(item => item.showRatio)?.value
              return `{total|${parseInt(showRatioValue * 100 / total)}%}\n\r{active|完成率}`
            },
            rich: {
              total: {
                fontSize: 24,
                fontFamily: '微软雅黑',
                color: '#454c5c'
              },
              active: {
                fontFamily: '微软雅黑',
                fontSize: 12,
                color: '#6c7a89',
                lineHeight: 20,
                align: 'center'
              }
            }
          }
        },
        labelLine: {
          show: false
        },
        data: _data
      }
    ]
  }
}
