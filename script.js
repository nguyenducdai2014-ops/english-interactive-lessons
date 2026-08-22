const steps = [...document.querySelectorAll('.step')];
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progress-bar');
const previewPanel = document.querySelector('#preview-panel');
const soundToggle = document.querySelector('#sound-toggle');
const toast = document.querySelector('#toast');

function selectStep(stepNumber) {
  steps.forEach((step) => step.classList.toggle('is-active', Number(step.dataset.step) === stepNumber));
  progressText.textContent = `${stepNumber} / 4`;
  progressBar.style.width = `${stepNumber * 25}%`;
  document.querySelector('.progress-track').setAttribute('aria-label', `Tiến độ ${stepNumber * 25}%`);
}

steps.forEach((step) => step.addEventListener('click', () => selectStep(Number(step.dataset.step))));

document.querySelector('#start-activity').addEventListener('click', () => {
  previewPanel.classList.add('show');
  selectStep(2);
  previewPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

soundToggle.addEventListener('click', () => {
  const enabled = soundToggle.getAttribute('aria-pressed') !== 'true';
  soundToggle.setAttribute('aria-pressed', String(enabled));
  toast.textContent = enabled ? 'Đã bật âm thanh hướng dẫn!' : 'Đã tắt âm thanh hướng dẫn!';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});
