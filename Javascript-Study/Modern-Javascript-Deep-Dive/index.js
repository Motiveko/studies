(function printNow() {
  const today = new Date();
  const dayNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
  '토요일',

  ];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const day = dayNames[today.getDay()];
  const ampm = (hour >= 12) ? 'PM' : 'AM';

    hour %= 12; // 24시간 -> 12시간
  hour = hour || 12;  // hour가 0이면 12로


        minute  = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;
  console.log(now);

}())


