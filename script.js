// Устанавливаем дату, до которой будет идти обратный отсчет
const targetDateInitial = new Date('April 12, 2025 13:00:00').getTime();
let targetDate = targetDateInitial;

// Функция обновления таймера
function updateTimer() {
  const now = new Date().getTime(); // Текущее время
  const timeRemaining = targetDate - now; // Разница во времени

  // Вычисляем дни, часы, минуты и секунды
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Форматируем время для отображения с ведущими нулями
  const daysText = days.toString().padStart(2, '0');
  const hoursText = hours.toString().padStart(2, '0');
  const minutesText = minutes.toString().padStart(2, '0');
  const secondsText = seconds.toString().padStart(2, '0');

  // Обновляем содержимое элемента с таймером
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `${daysText} дней ${hoursText} часов ${minutesText} минут ${secondsText} секунд`;

  // Если время истекло, отображаем сообщение
  if (timeRemaining < 0) {
    clearInterval(timerInterval);
    timerElement.textContent = 'Время истекло!';
  }
}

// Запускаем таймер при загрузке страницы
updateTimer();

// Обновляем таймер каждую секунду
const timerInterval = setInterval(updateTimer, 1000);

// === Модальное окно ввода секретного кода ===

// Получаем элементы
const modal = document.getElementById('modal');
const modifyTimerBtn = document.getElementById('modifyTimerBtn');
const closeButtons = document.querySelectorAll('.close-button');
const submitCodeBtn = document.getElementById('submitCodeBtn');
const secretCodeInput = document.getElementById('secretCode');
const codeError = document.getElementById('codeError');

// Секретный код
const secretCode = '1234'; // Задайте свой секретный код

// Открытие модального окна при нажатии на кнопку
modifyTimerBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Закрытие модальных окон при нажатии на крестик
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.style.display = 'none';
    modifyModal.style.display = 'none';
    secretCodeInput.value = '';
    codeError.style.display = 'none';
  });
});

// Закрытие модальных окон при клике вне их
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    secretCodeInput.value = '';
    codeError.style.display = 'none';
  }
  if (event.target == modifyModal) {
    modifyModal.style.display = 'none';
    timeChangeInput.value = '';
    reasonInput.value = '';
  }
});

// Проверка секретного кода
submitCodeBtn.addEventListener('click', () => {
  const enteredCode = secretCodeInput.value;
  if (enteredCode === secretCode) {
    // Код верный, переходим к изменению таймера
    modal.style.display = 'none';
    secretCodeInput.value = '';
    codeError.style.display = 'none';
    openModifyTimerModal();
  } else {
    // Код неверный, показываем сообщение об ошибке
    codeError.style.display = 'block';
  }
});

// === Модальное окно изменения таймера ===

// Получаем элементы
const modifyModal = document.getElementById('modifyModal');
const applyChangeBtn = document.getElementById('applyChangeBtn');
const timeChangeInput = document.getElementById('timeChange');
const reasonInput = document.getElementById('reason');

// Функция открытия модального окна изменения таймера
function openModifyTimerModal() {
  modifyModal.style.display = 'block';
}

// Обработка изменения таймера
applyChangeBtn.addEventListener('click', () => {
  const hoursToChange = parseInt(timeChangeInput.value);
  const reason = reasonInput.value;

  if (isNaN(hoursToChange) || hoursToChange === 0) {
    alert('Пожалуйста, введите корректное количество часов.');
    return;
  }

  if (!reason) {
    alert('Пожалуйста, укажите причину изменения.');
    return;
  }

  // Изменяем целевую дату
  targetDate += hoursToChange * 60 * 60 * 1000; // Конвертируем часы в миллисекунды

  // Закрываем модальное окно и очищаем поля
  modifyModal.style.display = 'none';
  timeChangeInput.value = '';
  reasonInput.value = '';

  // Обновляем таймер сразу после изменения
  updateTimer();

  // Вы можете сохранить информацию о причине изменения в лог или на сервер
  console.log(
    `Таймер изменён на ${hoursToChange} часов по причине: ${reason}`
  );
});

// Закрытие модальных окон при клике вне их (уже реализовано выше)
