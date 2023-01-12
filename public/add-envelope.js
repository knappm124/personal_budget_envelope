const submitButton = document.getElementById('submit-envelope');
const newEnvelope = document.getElementById('new-envelope');

submitButton.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;

  fetch(`/envelope?name=${name}&amount=${amount}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({envelope}) => {
    const success = document.createElement('div');
    success.innerHTML = `
    <h3>Congrats, your envelope was added!</h3>
    <div class="name-text">${envelope.name}</div>
    <div class="amount-text">${envelope.amount}</div>
    <p>Go to the <a href="index.html">home page</a> to view and edit all envelopes.</p>
    `
    newEnvelope.appendChild(success);
  });
});
