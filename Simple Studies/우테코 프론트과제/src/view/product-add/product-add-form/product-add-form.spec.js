import ProductAddForm from './product-add-form';
import model from '../../../model/model-instance';

// jest.mock('../../../model/model-instance');

describe.only('ProductAddForm', () => {
  let productForm;
  let spyAddProduct;
  let form;
  let spyReset;
  beforeEach(() => {
    productForm = new ProductAddForm();
    spyAddProduct = jest.spyOn(model, 'addProduct').mockImplementation(() => true);
    form = productForm.querySelector('#item-form');
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

  test('addProduct 수행 결과 문제발생해 false 리턴시 form을 리셋하지 않는다.', () => {
    // given
    if (!form) {
      throw new Error('상품 등록 form이 없습니다.');
    }
    spyAddProduct = jest.spyOn(model, 'addProduct').mockImplementation(() => false);
    // when
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    // then
    expect(spyReset).not.toHaveBeenCalled();
  });
});
