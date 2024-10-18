// Устанавливаем целевую дату (16 апреля 13:00 текущего года)
let targetDate = new Date();
targetDate.setMonth(3); // Месяцы в JS от 0 (январь) до 11 (декабрь)
targetDate.setDate(16);
targetDate.setHours(13, 0, 0, 0);

// Функция для обновления таймера
function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.querySelector('.timer').innerHTML = "Время истекло";
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Обновляем таймер каждую секунду
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

// Модальные окна
const modal = document.getElementById("modal");
const adjustModal = document.getElementById("adjustModal");
const btnIncrease = document.getElementById("increaseBtn");
const btnDecrease = document.getElementById("decreaseBtn");
const spanClose = document.getElementsByClassName("close");

// Открытие модального окна при нажатии кнопок
btnIncrease.addEventListener("click", () => openModal());
btnDecrease.addEventListener("click", () => openModal());

// Закрытие модального окна
for (let span of spanClose) {
    span.onclick = function() {
        modal.style.display = "none";
        adjustModal.style.display = "none";
        document.getElementById("codeError").innerText = "";
        document.getElementById("adjustError").innerText = "";
    }
}

// Закрытие при клике вне модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("codeError").innerText = "";
    }
    if (event.target == adjustModal) {
        adjustModal.style.display = "none";
        document.getElementById("adjustError").innerText = "";
    }
}

// Открытие модального окна
function openModal() {
    modal.style.display = "block";
}

// Валидация кода доступа
const submitCodeBtn = document.getElementById("submitCode");
submitCodeBtn.addEventListener("click", () => {
    const accessCode = document.getElementById("accessCode").value;
    const correctCode = "1234"; // Установите ваш код доступа здесь

    if (accessCode === correctCode) {
        modal.style.display = "none";
        adjustModal.style.display = "block";
    } else {
        document.getElementById("codeError").innerText = "Неверный код доступа.";
    }
});

// Функция для сохранения изменений в localStorage
function saveTargetDate() {
    localStorage.setItem('targetDate', targetDate.getTime());
}

// Функция для загрузки даты из localStorage
function loadTargetDate() {
    const storedDate = localStorage.getItem('targetDate');
    if (storedDate) {
        targetDate = new Date(parseInt(storedDate));
    }
}

// Загрузка даты при старте
loadTargetDate();

// Обработчик сохранения изменений
const submitAdjustBtn = document.getElementById("submitAdjust");
submitAdjustBtn.addEventListener("click", () => {
    const daysInput = parseInt(document.getElementById("daysInput").value);
    const reason = document.getElementById("reason").value.trim();

    if (isNaN(daysInput)) {
        document.getElementById("adjustError").innerText = "Пожалуйста, введите число дней.";
        return;
    }

    // Изменение целевой даты
    targetDate.setDate(targetDate.getDate() + daysInput);

    // Здесь вы можете обработать причину (например, сохранить или отобразить)

    saveTargetDate();
    adjustModal.style.display = "none";
    document.getElementById("daysInput").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("adjustError").innerText = "";
});