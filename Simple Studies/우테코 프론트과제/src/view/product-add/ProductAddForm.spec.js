import ProductAddForm from './ProductAddForm';
import model from '../../model/model-instance';
import VMError from '../../core/vm-error';

// jest.mock('../../../model/model-instance');

describe('ProductAddForm', () => {
  let productForm;
  let spyAddProduct;
  let form;
  let spyReset;
  beforeEach(() => {
    productForm = new ProductAddForm();
    spyAddProduct = jest.spyOn(model, 'addProduct').mockImplementation(() => true);
    form = productForm.querySelector('#product-form');
    spyReset = jest.spyOn(form, 'reset');
  });

  test('addProduct 수행 결과 에러가 안나면 form을 리셋한다.', () => {
    // given
    if (!form) {
      throw new Error('상품 등록 form이 없습니다.');
    }
    // when
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    // then
    expect(spyReset).toHaveBeenCalledTimes(1);
  });

  test('addProduct 수행 결과 VM에러 발생하지 않으면 폼을 reset한다.', () => {
    // given
    if (!form) {
      throw new Error('상품 등록 form이 없습니다.');
    }
    spyAddProduct = jest.spyOn(model, 'addProduct').mockImplementation(() => ({}));
    // when
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    // then
    expect(spyReset).toHaveBeenCalledTimes(1);
  });
});
