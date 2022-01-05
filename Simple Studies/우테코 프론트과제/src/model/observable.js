const cloneDeep = state => JSON.parse(JSON.stringify(state));
const freeze = state => Object.freeze(cloneDeep(state));

// state 객체의 proxy객체
export default initialState => {
  let listeners = [];
  const proxy = new Proxy(cloneDeep(initialState), {
    // eslint-disable-next-line no-unused-vars
    set(target, p, value, receiver) {
      // eslint-disable-next-line no-param-reassign
      target[p] = value;
      console.log(target);
      listeners.forEach(li => li(freeze(target)));
      return true;
    }
    // });
  });

  const addChangeListener = listener => {
    listeners.push(listener);
    listener(freeze(proxy));
    return () => {
      listeners = listeners.filter(li => li !== listener);
    };
  };

  return { proxy, addChangeListener };
};
