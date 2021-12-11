type Person = {
  name: string,
  age: number
}
const person = {
  names: `motiveko`, // 오타발생, 에러는 안난다.
  age: 13
}

const handlePerson = (person: Person) => {/*...*/};
handlePerson(person);