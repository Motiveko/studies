import modelFactory from './model';

describe('model - addProduct test', () => {
  let model = '';
  let spyAlert = '';
  let spyListener = '';

  beforeEach(() => {
    model = modelFactory();
    spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    spyListener = jest.fn();
  });

  afterEach(() => {});

  test('addProduct 호출하면 product가 추가된다.', () => {
    let realState = {};
    model.addChangeListener(state => {
      realState = state;
    });
    const product = {
      name: '아이템',
      price: 100,
      quantity: 10
    };
    model.addProduct(product);
    expect(realState.products[0]).toStrictEqual(product);
  });

  test('addProduct에서 product에 필요 속성이 없으면 alert 호출한다.', () => {
    // when
    model.addChangeListener(spyListener);
    model.addProduct({});

    // then
    expect(spyAlert).toHaveBeenCalledWith('상품은 name, price, quantity는 필수 속성입니다.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('상품 가격이 숫자가 아니면 alert 호출한다.', () => {
    // given
    model.addChangeListener(spyListener);

    // when
    model.addProduct({ name: 'name', quantity: 0, price: '한글' });

    expect(spyAlert).toHaveBeenCalledWith('상품 가격은 숫자만 입력해주세요.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('상품 가격이 100원 이하이거나 나눠떨어 지지 않으면 alert 호출한다.', () => {
    // given
    const name = 'name';
    const quantity = 10;
    model.addChangeListener(spyListener);

    // when
    model.addProduct({ name, quantity, price: 101 });
    model.addProduct({ name, quantity, price: 90 });

    // then
    expect(spyAlert).toHaveBeenCalledWith('상품 가격은 100원 이상이며 10으로 나눠떨어져야 합니다.');
    expect(spyAlert).toHaveBeenCalledTimes(2);
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('상품 갯수가 숫자가 아니거나 음수면 alert 호출한다.', () => {
    // given
    const name = 'n';
    const price = 110;
    model.addChangeListener(spyListener);

    // when
    model.addProduct({ name, price, quantity: '한글' });
    model.addProduct({ name, price, quantity: -1 });

    expect(spyAlert).toHaveBeenCalledWith('상품 수량은 숫자만 입력 가능합니다.');
    expect(spyAlert).toHaveBeenCalledWith('상품 수량의 최소값은 0 입니다.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });
});
