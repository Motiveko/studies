import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChildModule } from './child.module';

@Injectable({
  providedIn: ChildModule
})
export class PuppiesStoreService implements OnInit, OnDestroy{

  private readonly _puppiesSource = new BehaviorSubject<Puppy[]>([])

  private puppies$ = this._puppiesSource.asObservable()

  constructor() {}
  
  ngOnInit(): void {
    console.log('퍼피 스토어 서비스 생성')
  }
  ngOnDestroy(): void {
    console.log("PuppiesStoreService Destroied")
  }

  getPuppies(): Puppy[] {
    return this._puppiesSource.getValue()
  }

  private _setPuppies(puppies: Puppy[]): void {
    this._puppiesSource.next(puppies)
  }

  addPuppy(puppy: Puppy): void {
    const puppies = [...this.getPuppies(), puppy]
    this._setPuppies(puppies)
  }

  removePuppy(puppy: Puppy): void {
    const puppies = this.getPuppies().filter(p => p.id !== puppy.id)
    this._setPuppies(puppies)
  }

  // 입양됨인데,, 이거는 코드 좀 다르다 P
  adoptPuppy(puppy: Puppy): void {
    const puppies = this.getPuppies().map( p =>
      p.id === puppy.id ? puppy : p
    )
    this._setPuppies(puppies)
  }
}
