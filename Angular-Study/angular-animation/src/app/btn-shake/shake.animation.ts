import {
  animate,
  AnimationAnimateMetadata,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const ShakeAnimation = [
  style({ transform: 'rotate(0)' }),
  ...getShakeArray({ degree: -4, damper: 1.1 }),
];

export const shakeTrigger = [
  trigger('queryShake', [
    transition('* => shake', [query('.card', ShakeAnimation)]),
  ]),
  trigger('enterCard', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
  ]),
];

/**
 * shake를 위한 animation의 배열
 * @param parameter : ShakeAnimationParameter
 * @returns
 */
function getShakeArray(
  parameter: ShakeAnimationParameter = { degree: -4, damper: 1.1 }
): AnimationAnimateMetadata[] {
  let degree = parameter.degree;

  return Array.from({ length: 10 }, (_, i) => {
    degree = -degree / parameter.damper ** i;
    if (Math.abs(degree) < 1) {
    }
    return animate('0.1s', style({ transform: `rotate(${degree}deg)` }));
  }).concat([animate('0.1s', style({ transform: 'rotate(0)' }))]);
}

/**
 * Shake 에니메이션의 동작 디테일을 위한 설정값
 * degre: 최초 rotate 각도
 * damper: 단위시간당 degree 감소 비율
 * step: 0.1s 단위로 몇번까지 흔들것인가
 */
interface ShakeAnimationParameter {
  degree: number;
  damper: number;
}
