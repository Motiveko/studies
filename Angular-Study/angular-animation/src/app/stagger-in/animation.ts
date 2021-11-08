import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const staggerInOut = [
  trigger('componentInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(40px)' }),
      animate(
        '300ms ease-in-out',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '400ms ease-in-out',
        style({ opacity: 0, transform: 'translateY(40px)' })
      ),
    ]),
  ]),
  trigger('cardStagger', [
    transition(':enter', [
      query('mat-card', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        stagger('50ms', [
          animate('400ms', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ]),
    ]),
    transition(':leave', [
      query('mat-card', [
        stagger('50ms', [
          animate(
            '400ms',
            style({ opacity: 0, transform: 'translateY(40px)' })
          ),
        ]),
      ]),
    ]),
  ]),
];
