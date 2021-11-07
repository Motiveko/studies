import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  stagger,
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
          stagger('50ms', [
            animate('510ms', style({ opacity: 1, transform: 'tanslateX(0)' })),
          ]),
        ]),
        query('mat-grid-tile:nth-child(2)', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          animate(
            '620ms ease-in',
            style({ opacity: 1, transform: 'tanslateY(0)' })
          ),
        ]),
        query('mat-grid-tile:nth-child(3)', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          animate('550ms', style({ opacity: 1, transform: 'tanslateY(0)' })),
        ]),
        query('mat-grid-tile:nth-child(4)', [
          style({ opacity: 0, transform: 'translateX(60px)' }),
          animate(
            '599ms ease-in',
            style({ opacity: 1, transform: 'tanslateX(0)' })
          ),
        ]),
      ]),
    ]),
    transition(':leave', [
      query(
        'mat-grid-list',
        animate('600ms', style({ opacity: 0, transform: 'translateY(80px)' })),
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
export const slideInAnimation = [
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
            '1.2s ease-in-out',
            style({ opacity: 1, transform: 'translateX(0)' })
          ),
        ]),
      ]),
    ]),
  ]),
];
