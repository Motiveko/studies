const cloneDeep = state => JSON.parse(JSON.stringify(state));
const freeze = state => Object.freeze(cloneDeep(state));

// state 객체의 proxy객체
export default initialState => {
  let listeners = [];
  const proxy = new Proxy(cloneDeep(initialState), {
    set(target, p, value) {
      // eslint-disable-next-line no-param-reassign
      target[p] = value;
      listeners.forEach(li => li(freeze(target)));
      return true;
    }
  });

  proxy.addChangeListener = listener => {
    listeners.push(listener);
    listener(freeze(proxy));
    return () => {
      listeners = listeners.filter(li => li !== listener);
    };
  };

  return proxy;
};
