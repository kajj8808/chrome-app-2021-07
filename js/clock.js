const clock = document.querySelector("#clock");

/* 0 ~ 9 까지의 한자리 숫자에 대해서 앞에 0 를 추가 ex)08 */
const calClock = (date) => {
  const strDate = String(date);
  return strDate.length === 1 ? `0${strDate}` : strDate;
};

const getClock = () => {
  const date = new Date();
  const hours = calClock(date.getHours());
  const minutes = calClock(date.getMinutes());
  const seconds = calClock(date.getSeconds());
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

getClock();
setInterval(getClock, 1000);

