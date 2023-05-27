export function calculateTimePassed(dateString) {
  const currentDate = new Date();

  const isoDateString = dateString.replace(
    /(\d{2}) (\w{3}) (\d{4})/,
    "$2 $1 $3"
  );

  const dateObject = new Date(isoDateString);

  const timeDiff = currentDate.getTime() - dateObject.getTime();

  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;
  const millisecondsInMonth = millisecondsInDay * 30;
  const millisecondsInYear = millisecondsInDay * 365;

  if (timeDiff < millisecondsInMinute) {
    const secondsPassed = Math.floor(timeDiff / millisecondsInSecond);
    return `${secondsPassed} second${secondsPassed !== 1 ? 's' : ''} ago`;
  } else if (timeDiff < millisecondsInHour) {
    const minutesPassed = Math.floor(timeDiff / millisecondsInMinute);
    return `${minutesPassed} minute${minutesPassed !== 1 ? 's' : ''} ago`;
  } else if (timeDiff < millisecondsInDay) {
    const hoursPassed = Math.floor(timeDiff / millisecondsInHour);
    return `${hoursPassed} hour${hoursPassed !== 1 ? 's' : ''} ago`;
  } else if (timeDiff < millisecondsInMonth) {
    const daysPassed = Math.floor(timeDiff / millisecondsInDay);
    return `${daysPassed} day${daysPassed !== 1 ? 's' : ''} ago`;
  } else if (timeDiff < millisecondsInYear) {
    const monthsPassed = Math.floor(timeDiff / millisecondsInMonth);
    return `${monthsPassed} month${monthsPassed !== 1 ? 's' : ''} ago`;
  } else {
    const yearsPassed = Math.floor(timeDiff / millisecondsInYear);
    return `${yearsPassed} year${yearsPassed !== 1 ? 's' : ''} ago`;
  }
}
