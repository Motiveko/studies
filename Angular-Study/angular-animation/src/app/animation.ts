import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeAnimation = [
  trigger('routeAnimation', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
      optional: true,
    }), // translate를 사용하기 위해 필요한 옵션
    transition('* => *', [
      group([
        query(':leave', [animate('1s', style({}))], { optional: true }),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
  ]),
];
