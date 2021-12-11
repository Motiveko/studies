import {ReadonlyDeep} from 'type-fest/source/readonly-deep'

type Person = {
  name: string,
  address: {
    city: string,
    state: string
  }
}
type DeepReadonlyPerson = ReadonlyDeep<Person>;
const person: DeepReadonlyPerson = {
  name: 'motiveko',
  address: {
    city: 'seoul',
    state: 'yp'
  }
}
person.address.city = 'pusan'