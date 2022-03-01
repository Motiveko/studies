export function callApiLike() {
  return new Promise((res, rej) => {
    setTimeout(res, 1000);
  })
}