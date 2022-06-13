const button = document.getElementById('actionBtn');

button.addEventListener('click',() => {
  fetch('/api/v1/check/list')
    .then((result) => result.json())
    .then(console.log);
})