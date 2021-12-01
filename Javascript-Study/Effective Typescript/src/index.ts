const checkedFetch: typeof fetch = (input, init) => {
  return fetch(input, init)
    .then((response) => response.json())
    .catch((err) => new Error(err.status));
};
