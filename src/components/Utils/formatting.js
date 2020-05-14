export const quantifier = (qty, name) => {
  switch(qty) {
    case qty === 0:
      return 'No ${name}'
    case qty === 1:
      return `${qty} ${name}`;
    default:
      return `${qty} ${name}s`
    }

}

export const stringifyDate = (timestamp) => {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const contentDay = date.getDay();
  const currentDay = currentDate.getDay()
  const differenceInDays =( currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  switch(differenceInDays) {
    case (differenceInDays === 1 && currentDay - contentDay === 1) :
      return `yesterday at ${dateTimeFormat_12hr(date)}`
    case (differenceInDays === 0 && currentDay === contentDay) :
      return `today at ${dateTimeFormat_12hr(date)}`
    case (differenceInDays > 1):
      return `${getWeekDay(date.getDay())}`
    default:
      return `${getMonthName(date.getMonth())} ${date.getDate()} at ${dateTimeFormat_12hr(date)}`
  }
    
}

export const dateTimeFormat_12hr = (date = new Date()) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const season = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 ? hours % 12 : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes} ${season}`;
  return time
}

export const durationTimeFormat = (num) => {
  const slice = (part) => (`000${part}`).slice(-2);
  const hours = Math.floor(num / 3600);
  const minutes = Math.floor(num / 60) % 60;
  const seconds = Math.floor(num - minutes * 60);
  if(hours < 1) return `${slice(minutes)}:${slice(seconds)}`
  return `${slice(hours)}:${slice(minutes)}:${slice(seconds)}`
}

const getMonthName = (month) => {
  const monthNames = ['Jan', 'Feb', "Mar", 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month]
}

const getWeekDay = (week) => {
  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  return weekDays[week]
}