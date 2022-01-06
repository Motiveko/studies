import VMError from '../core/vm-error';

export const validateCharge = charge => {
  if (isNaN(charge) || charge % 10 !== 0) {
    throw new VMError('입력값은 10단위의 숫자여야 합니다.');
  }
};

// TODO : model의 validation로직 분리할 것
export const validateProduct = product => true;
