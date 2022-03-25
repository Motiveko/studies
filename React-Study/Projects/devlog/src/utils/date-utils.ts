const oneMinuteMillis = 1_000 * 60;
const oneHourMillis = oneMinuteMillis * 60;
const oneDayMillis = oneHourMillis * 24;
const oneWeekMillis = oneDayMillis * 7;

/**
 * millisecond를 현재시간을 기준으로 아래 포맷으로 파싱한다.
 * 1분 이내 : 방금 전
 * 1시간 이내 : ~분 전
 * 24시간 이내 : ~시간 전
 * 24시간 ~ 1주일 이내 : ~일 전
 * 1주일 ~ 올해 이내 : MM/dd
 * 작년 이전 : YYYY/MM/dd
 * @param millis string
 */
type ParseDate = (millis: number) => string;

export const parseDate: ParseDate = (millis) => {
  const nowDate = new Date();
  const nowMillis = nowDate.getTime();

  const timeGap = nowMillis - millis;
  if (timeGap <= oneMinuteMillis) {
    return "방금 전";
  }

  if (timeGap <= oneHourMillis) {
    return Math.floor(timeGap / oneMinuteMillis) + "분 전";
  }

  if (timeGap <= oneDayMillis) {
    return Math.floor(timeGap / oneHourMillis) + "시간 전";
  }

  if (timeGap <= oneWeekMillis) {
    return Math.floor(timeGap / oneDayMillis) + "일 전";
  }

  const date = new Date(millis);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (nowDate.getFullYear() === year) {
    return `${month}/${day}`;
  }

  return `${year}/${month}/${day}`;
};
