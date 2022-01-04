import modelFactory from './model';

describe('model - addItem test', () => {
  let model = '';
  let spyAlert = '';
  let spyListener = '';

  beforeEach(() => {
    model = modelFactory();
    spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    spyListener = jest.fn();
  });

  afterEach(() => {});

  test('addItem 호출하면 item이 추가된다.', () => {
    let realState = {};
    model.addChangeListener(state => {
      realState = state;
    });
    const item = {
      name: '아이템',
      price: 100,
      stock: 10
    };
    model.addItem(item);
    expect(realState.items[0]).toStrictEqual(item);
  });

  test('addItem에서 item에 필요 속성이 없으면 alert 호출한다.', () => {
    // when
    model.addChangeListener(spyListener);
    model.addItem({});

    // then
    expect(spyAlert).toHaveBeenCalledWith('상품은 name, price, stock이 필수 속성입니다.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('상품 가격이 숫자가 아니면 alert 호출한다.', () => {
    // given
    model.addChangeListener(spyListener);

    // when
    model.addItem({ name: 'name', stock: 0, price: '한글' });

    expect(spyAlert).toHaveBeenCalledWith('상품 가격은 숫자만 입력해주세요.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });

  test('상품 가격이 100원 이하이거나 나눠떨어 지지 않으면 alert 호출한다.', () => {
    // given
    const name = 'name';
    const stock = 10;
    model.addChangeListener(spyListener);

    // when
    model.addItem({ name, stock, price: 101 });
    model.addItem({ name, stock, price: 90 });

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
    model.addItem({ name, price, stock: '한글' });
    model.addItem({ name, price, stock: -1 });

    expect(spyAlert).toHaveBeenCalledWith('상품 수량은 숫자만 입력 가능합니다.');
    expect(spyAlert).toHaveBeenCalledWith('상품 수량의 최소값은 0 입니다.');
    expect(spyListener).toHaveBeenCalledTimes(1);
  });
});
