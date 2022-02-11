import moment from 'moment'

export function getWeekDay () {
  // 可以修改成传递参数查根据当前时间 几天或者后几天的日期以及星期
  const WeekOfDay = moment().format('E')
  const lastMonDay = moment().subtract(11 - WeekOfDay, 'days').format('YYYYMMDD')
  const lastSunday = moment().add(5 - WeekOfDay, 'days').format('YYYYMMDD')
  const arr = []
  for (let i = lastMonDay; i <= lastSunday; i++) {
    // 将每个日期转为字符串
    const j = String(i)
    const obj = {
      day: j.slice(0, 4) + '-' + j.slice(4, 6) + '-' + j.slice(6, 8)
    }
    arr.push(obj)
  }
  const weekDay = arr.map((item, index) => {
    const date = item.day
    return { date, week: fiterWeekName(item.day) }
  })
  return weekDay
}
export function fiterWeekName (date) {
  const newDate = new Date(date.replace(/-/g, '/'))
  const weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekDay[newDate.getDay()]
}
