const friends = [
  { name: '김민수', age: 10},
  { name: '이지현', age: 12},
  { name: '박수진', age: 23},
  { name: '최익현', age: 33},
]

const timelines = [
  { desc: '오늘 핫하다', likes: 1},
  { desc: '철권한판 함', likes: 3},
  { desc: '하이볼 한잔 함', likes: 10},
  { desc: '순천만 구경함', likes: 0},
]

function makeDataGenerator(items) {
  let itemIndex = 0;
  return function() {
    const item = items[itemIndex % items.length];
    itemIndex += 1;
    return {...item, id: itemIndex };
  }
}

export const getNextTimeline = makeDataGenerator(timelines);
export const getNextFriend = makeDataGenerator(friends);