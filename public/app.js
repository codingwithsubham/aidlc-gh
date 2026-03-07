document.addEventListener('DOMContentLoaded', () => {
  const apiMessageEl = document.getElementById('api-message');
  const healthBtn = document.getElementById('health-btn');
  const healthResult = document.getElementById('health-result');

  // Fetch and display the API message on load
  fetch('/api/message')
    .then((res) => res.json())
    .then((data) => {
      apiMessageEl.textContent = data.message;
    })
    .catch(() => {
      apiMessageEl.textContent = 'Failed to load message from API.';
    });

  // Wire up the health check button
  healthBtn.addEventListener('click', () => {
    healthBtn.disabled = true;
    healthBtn.textContent = 'Checking...';

    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        healthResult.textContent = JSON.stringify(data, null, 2);
        healthResult.classList.remove('hidden');
      })
      .catch(() => {
        healthResult.textContent = 'Health check failed.';
        healthResult.classList.remove('hidden');
      })
      .finally(() => {
        healthBtn.disabled = false;
        healthBtn.textContent = 'Check Health';
      });
  });
});
