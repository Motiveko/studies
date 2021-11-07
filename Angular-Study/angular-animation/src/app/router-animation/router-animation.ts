import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const componentInOutAnimation = [
  trigger('componentInOut', [
    transition(':enter', [
      group([
        query('mat-grid-tile:nth-child(1)', [
          style({ opacity: 0, transform: 'translateX(-40px)' }),
          animate('550ms', style({ opacity: 1, transform: 'tanslateX(0)' })),
        ]),
        query('mat-grid-tile:nth-child(2)', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          animate(
            '600ms ease-in',
            style({ opacity: 1, transform: 'tanslateY(0)' })
          ),
        ]),
        query('mat-grid-tile:nth-child(3)', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          animate('500ms', style({ opacity: 1, transform: 'tanslateY(0)' })),
        ]),
        query('mat-grid-tile:nth-child(4)', [
          style({ opacity: 0, transform: 'translateX(60px)' }),
          animate(
            '580ms ease-in',
            style({ opacity: 1, transform: 'tanslateX(0)' })
          ),
        ]),
      ]),
    ]),
    transition(':leave', [
      query(
        'mat-grid-tile',
        [
          animate(
            '400ms ease-in-out',
            style({ opacity: 0, transform: 'translateY(80px)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
];

const setPositionAbsolute = [
  style({
    position: 'absolute',
    width: '100%',
  }),
];

/**
 * 자식 요소의 :enter, :leave animation을 사용하는 라우트 에니메이션
 */
// export const routeAnimationUsingChilds = [
//   trigger('routeAnimation', [
//     transition('* => *', [
//       query(':enter, :leave', style({ position: 'absolute', width: '100%' })), // translate를 사용하기 위해 필요한 옵션
//       group([
//       // 이게 핵심이다. 이걸 걸어줘야 leave 하는 컴포넌트(<app-component1/2>)가 DOM에서 즉시 사라지지 않아, animateChild()가 작동할 수 있게 된다.
//       query(':leave', [animate('1s', style({}))]),
//       query('@*', animateChild()),
//       ]),
//     ]),
//   ]),
// ];

const initComponents = [
  query(':enter, :leave', [...setPositionAbsolute]),
  query(':enter', [
    style({
      transform: 'translateX(-100px)',
      opacity: 0,
    }),
  ]),
  query(':leave', [
    style({
      transform: 'translateY(0)',
    }),
  ]),
];

/**
 * route 시 자식 컴포넌트를 통째로 animate
 */
export const routeAnimation = [
  trigger('routeAnimation', [
    transition('* => *', [
      ...initComponents,
      group([
        query(':leave', [
          animate(
            '0.3s ease-in-out',
            style({ opacity: 0, transform: 'translateY(80px)' })
          ),
        ]),
        query(':enter', [
          animate(
            '1s ease-in-out',
            style({ opacity: 1, transform: 'translateX(0)' })
          ),
        ]),
      ]),
    ]),
  ]),
];
