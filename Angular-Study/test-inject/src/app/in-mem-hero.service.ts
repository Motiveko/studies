import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import {  Observable, range } from 'rxjs';
import * as faker from 'faker/locale/ko'
import { map, reduce } from 'rxjs/operators';

/**
 * Http Client의 Api호출을 Mocking하기위한 InMemoryDbService 구현체
 */
@Injectable({
  providedIn: 'root'
})
export class InMemHeroService implements InMemoryDbService {

  constructor() {}

  onePerson = () => {
    return {
      id: faker.datatype.uuid(),
      phone: faker.phone.phoneNumber(),
      phoneNumberFormat: faker.phone.phoneNumberFormat(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      zipCode: faker.address.zipCode(),
      city: faker.address.city(),
      streetName: faker.address.streetName(),
      streetAddress: faker.address.streetAddress(),
    }
  }
  persons () {
    const res = [];
    range(faker.datatype.number(1000)).pipe(
      map(this.onePerson)
    ).subscribe(
      person => res.push(person),
      (err) => console.log(err),
      () => console.log('mockData complete!')
    )
    return res;
  }
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let heros = [
      {id : 1, name : "아이언맨"},
      {id : 2, name : "토르"},
      {id : 3, name : "헐크"},
      {id : 4, name : "블랙 위도우"},
    ]    
    return { 
      heros, 
      persons: this.persons() 
    };
    // return from(heros)
  }
}
