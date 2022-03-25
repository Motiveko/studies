import { parseDate } from "./date-utils";
const oneMinuteMillis = 1_000 * 60;
const oneHourMillis = oneMinuteMillis * 60;
const oneDayMillis = oneHourMillis * 24;
const oneWeekMillis = oneDayMillis * 7;

describe("date util 테스트", () => {
  test("테스트", () => {
    const nowMillis = Date.now();

    // 1. 방금
    expect(parseDate(nowMillis - 30)).toBe("방금 전");

    // 2. ~ 분 전
    expect(parseDate(nowMillis - 5 * oneMinuteMillis)).toBe("5분 전");

    // 3. ~ 시간 전
    [...Array(23).keys()]
      .map((i) => i + 1)
      .forEach((i) =>
        expect(parseDate(nowMillis - i * oneHourMillis)).toBe(`${i}시간 전`)
      );

    // 4. ~ 일 전
    [...Array(6).keys()]
      .map((i) => i + 1)
      .forEach((i) =>
        expect(parseDate(nowMillis - i * oneDayMillis)).toBe(`${i}일 전`)
      );

    // 5. mm/dd - 올해까진 MM/DD로 표시한다. 만약에 현재 날짜가 1월 7일 이전이면 이건 표시될 수 없고, ~ 일 전이 표시된다.
    const now = new Date();
    const januarySecond = new Date(now.getFullYear(), 0, 2);
    expect(parseDate(januarySecond.getTime())).toBe("1/2");

    // yyyy/mm/dd 출력 테스트
    const anotherYearDate = "2020/4/1";
    expect(parseDate(new Date(anotherYearDate).getTime())).toBe(
      anotherYearDate
    );
  });
});
