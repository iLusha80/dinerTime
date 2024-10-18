console.log('Scripte sucsesvuli blat import')
const targetDate = new Date('April 12, 2025 13:00:00').getTime()

console.log(targetDate)
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);
// const mytimerInterval = setInterval(egorLox, 1000);

// TODO узнать про переменные и функции в js 
// так же узнать про setInterval смысл применение



function updateTimer() {
  const now = new Date().getTime(); // Текущее время
  const timeRemaining = targetDate - now; // Разница во времени

  // Вычисляем дни, часы, минуты и секунды
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
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


function egorLox(){
	const msg = 'egorLox'
	console.log(msg)
}