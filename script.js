const steps = [...document.querySelectorAll('.step')];
const totalSteps = steps.length;
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progress-bar');
const progressTrack = document.querySelector('.progress-track');
const previewPanel = document.querySelector('#preview-panel');
const soundToggle = document.querySelector('#sound-toggle');
const toast = document.querySelector('#toast');
const lessonActivity = document.querySelector('#lesson-activity');
const activityLabel = document.querySelector('#activity-label');
const contentTitle = document.querySelector('#content-title');
const contentInstruction = document.querySelector('#content-instruction');
const activityBadge = document.querySelector('#activity-badge');
const activityBody = document.querySelector('#activity-body');
const activityFeedback = document.querySelector('#activity-feedback');
const nextActivity = document.querySelector('#next-activity');

const warmUpQuestions = [
  {
    prompt: 'Which word is related to a school?',
    options: ['school', 'banana', 'river', 'bedroom'],
    answer: 'school',
    explanation: 'School means “trường học”, so it is the word directly related to the topic My New School.'
  },
  {
    prompt: 'You study with your classmates in a …',
    options: ['classroom', 'kitchen', 'garden', 'bathroom'],
    answer: 'classroom',
    explanation: 'A classroom is a room where students learn together. “Kitchen”, “garden” and “bathroom” are not normally places for a class.'
  },
  {
    prompt: 'Which sentence is a natural way to introduce your new school?',
    options: ['This is my new school.', 'This are my new school.', 'These is my new school.', 'This am my new school.'],
    answer: 'This is my new school.',
    explanation: 'We use “This is …” to introduce one thing. The other choices use the wrong form of be.'
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function selectStep(stepNumber) {
  const safeStep = Math.min(Math.max(stepNumber, 1), totalSteps);
  const percent = Math.round((safeStep / totalSteps) * 100);

  steps.forEach((step) => {
    step.classList.toggle('is-active', Number(step.dataset.step) === safeStep);
  });

  progressText.textContent = `${safeStep} / ${totalSteps}`;
  progressBar.style.width = `${percent}%`;
  progressTrack.setAttribute('aria-label', `Tiến độ ${percent}%`);

  renderStep(safeStep);
}

function renderWarmUp() {
  const question = warmUpQuestions[currentQuestion];
  answered = false;
  activityLabel.textContent = 'KHỞI ĐỘNG • QUICK START';
  contentTitle.textContent = 'Let’s get started!';
  contentInstruction.textContent = question.prompt;
  activityBadge.textContent = `${currentQuestion + 1} / ${warmUpQuestions.length}`;
  activityFeedback.textContent = '';
  nextActivity.textContent = currentQuestion === warmUpQuestions.length - 1 ? 'Hoàn thành ✓' : 'Câu tiếp theo →';

  activityBody.innerHTML = `
    <div class="question-card">
      <div class="question-number">Câu ${currentQuestion + 1}</div>
      <div class="question-prompt">${question.prompt}</div>
      <div class="answer-grid">
        ${question.options.map((option, index) => `
          <button class="answer-option" type="button" data-answer="${option}">
            <span>${String.fromCharCode(65 + index)}</span>${option}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  activityBody.querySelectorAll('.answer-option').forEach((button) => {
    button.addEventListener('click', () => checkAnswer(button.dataset.answer));
  });
}

function checkAnswer(answer) {
  if (answered) return;
  answered = true;
  const question = warmUpQuestions[currentQuestion];
  const buttons = [...activityBody.querySelectorAll('.answer-option')];
  const chosen = buttons.find((button) => button.dataset.answer === answer);
  const correct = answer === question.answer;

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === question.answer) button.classList.add('is-correct');
  });

  if (chosen && !correct) chosen.classList.add('is-wrong');

  if (correct) {
    score += 1;
    activityFeedback.innerHTML = `<strong class="feedback-good">✓ Chính xác!</strong> ${question.explanation}`;
  } else {
    activityFeedback.innerHTML = `<strong class="feedback-bad">✗ Chưa đúng.</strong> Đáp án đúng là <b>${question.answer}</b>. ${question.explanation}`;
  }
}

function showFinalWarmUp() {
  activityLabel.textContent = 'KHỞI ĐỘNG • HOÀN THÀNH';
  contentTitle.textContent = 'Tuyệt vời! Em đã khởi động xong.';
  contentInstruction.textContent = 'Hãy xem kết quả trước khi chuyển sang phần Từ vựng.';
  activityBadge.textContent = '✓';
  activityBody.innerHTML = `
    <div class="result-card">
      <div class="result-score">${score}<span>/${warmUpQuestions.length}</span></div>
      <div><h3>Kết quả khởi động</h3><p>${score === warmUpQuestions.length ? 'Rất tốt! Em đã sẵn sàng học Unit 1.' : 'Em hãy xem lại phần giải thích rồi tiếp tục nhé.'}</p></div>
    </div>
  `;
  activityFeedback.textContent = '';
  nextActivity.textContent = 'Sang Từ vựng →';
}

function renderPlaceholder(stepNumber) {
  const names = ['Khởi động', 'Từ vựng', 'Ngữ pháp', 'Luyện tập', 'Đọc hiểu', 'Nói', 'Thử thách'];
  const descriptions = [
    'Làm quen với chủ đề My New School.',
    'Phần từ vựng sẽ gồm từ mới, IPA, nghĩa tiếng Việt và phát âm.',
    'Phần ngữ pháp sẽ trình bày lý thuyết, ví dụ và bài tập có giải thích.',
    'Phần luyện tập sẽ có các dạng bài tương tác và chấm điểm.',
    'Phần đọc hiểu sẽ có bài đọc, câu hỏi và kiểm tra mức độ hiểu bài.',
    'Phần nói sẽ cung cấp từ gợi ý, mẫu câu và nhiệm vụ Speaking.',
    'Phần thử thách sẽ tổng hợp kiến thức của Unit 1.'
  ];
  activityLabel.textContent = `PHẦN ${String(stepNumber).padStart(2, '0')}`;
  contentTitle.textContent = names[stepNumber - 1];
  contentInstruction.textContent = descriptions[stepNumber - 1];
  activityBadge.textContent = `${stepNumber} / ${totalSteps}`;
  activityBody.innerHTML = `<div class="coming-card"><span class="coming-icon">✦</span><div><h3>Nội dung đang được xây dựng</h3><p>Khung tương tác của phần này đã sẵn sàng. Chúng ta sẽ đưa nội dung Unit 1 vào từng bước tiếp theo.</p></div></div>`;
  activityFeedback.textContent = '';
  nextActivity.textContent = stepNumber < totalSteps ? 'Sang phần tiếp theo →' : 'Hoàn tất Unit 1';
}

function renderStep(stepNumber) {
  if (stepNumber === 1) {
    previewPanel.classList.add('show');
    renderWarmUp();
  } else {
    previewPanel.classList.remove('show');
    renderPlaceholder(stepNumber);
  }
}

steps.forEach((step) => {
  step.addEventListener('click', () => {
    selectStep(Number(step.dataset.step));
    lessonActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

document.querySelector('#start-activity').addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  selectStep(1);
  lessonActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

nextActivity.addEventListener('click', () => {
  if (currentQuestion < warmUpQuestions.length - 1 && document.querySelector('.answer-option')) {
    if (!answered) {
      activityFeedback.innerHTML = '<strong class="feedback-bad">Hãy chọn một đáp án trước nhé.</strong>';
      return;
    }
    currentQuestion += 1;
    renderWarmUp();
    return;
  }

  if (currentQuestion === warmUpQuestions.length - 1 && answered) {
    showFinalWarmUp();
    return;
  }

  if (currentQuestion === warmUpQuestions.length - 1 && !document.querySelector('.answer-option')) {
    selectStep(2);
    lessonActivity.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

soundToggle.addEventListener('click', () => {
  const enabled = soundToggle.getAttribute('aria-pressed') !== 'true';
  soundToggle.setAttribute('aria-pressed', String(enabled));
  toast.textContent = enabled ? 'Đã bật âm thanh hướng dẫn!' : 'Đã tắt âm thanh hướng dẫn!';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});

renderStep(1);
