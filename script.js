const coin = document.getElementById('coin');
const tasksContainer = document.querySelector('.tasks-container');
const balanceElement = document.getElementById('balance');

let balance = parseFloat(localStorage.getItem('balance')) || 0; // Загружаем баланс из localStorage
balanceElement.textContent = balance.toFixed(2) + ' FPI'; // Отображаем баланс

coin.addEventListener('mousedown', () => { // Событие нажатия кнопки мыши
  coin.classList.add('pressed'); // Добавляем класс 'pressed'
});

coin.addEventListener('mouseup', () => { // Событие отпускания кнопки мыши
  coin.classList.remove('pressed'); // Удаляем класс 'pressed'
});

coin.addEventListener('touchstart', () => { // Для мобильных устройств (нажатие пальцем)
  coin.classList.add('pressed');
});

coin.addEventListener('touchend', () => { // Для мобильных устройств (отпускание пальца)
  coin.classList.remove('pressed');
});

// Функция для загрузки состояния заданий из localStorage
function loadTasksState() {
    const tasksState = JSON.parse(localStorage.getItem('tasksState')) || {};
    document.querySelectorAll('.task-card').forEach(taskCard => {
        const taskType = taskCard.dataset.task;
        if (tasksState[taskType]) {
            taskCard.classList.add('completed');
        }
    });
}

// Функция для сохранения состояния заданий в localStorage
function saveTaskState(taskType) {
    const tasksState = JSON.parse(localStorage.getItem('tasksState')) || {};
    tasksState[taskType] = true;
    localStorage.setItem('tasksState', JSON.stringify(tasksState));
}

// Функция для начисления награды
function reward(taskCard) {
    const rewardValue = parseFloat(taskCard.querySelector('.task-button').dataset.reward);
    balance += rewardValue;
    balanceElement.textContent = balance.toFixed(2) + ' FPI';
    localStorage.setItem('balance', balance.toFixed(2)); // Сохраняем баланс
}

// Функция для обработки нажатия на кнопку задания
function handleTaskClick(taskButton) {
    const taskCard = taskButton.closest('.task-card');
    const taskType = taskCard.dataset.task;

    // Проверяем, выполнено ли задание
    if (taskCard.classList.contains('completed')) {
        return; // Если задание выполнено, ничего не делаем
    }

    // Выполняем задание (фиктивная проверка)
    reward(taskCard); // Начисляем награду

    // Отмечаем задание как выполненное
    taskCard.classList.add('completed');
    saveTaskState(taskType);

    // Для ссылки на Telegram не нужно отключать кнопку, просто открываем ссылку
    if (taskType !== 'join-telegram') {
        taskButton.disabled = true;
        taskButton.classList.add('task-button-disabled');
    }

    if (taskType === 'join-telegram') {
        window.open('https://t.me/Alekszovru', '_blank');
    }
}

// Обработчик клика на карточку задания
tasksContainer.addEventListener('click', (event) => {
    const taskButton = event.target.closest('.task-button');

    if (taskButton) {
        handleTaskClick(taskButton);
    }
});

// Загружаем состояние заданий при загрузке страницы
loadTasksState();
const coin = document.getElementById('coin');

coin.addEventListener('mousedown', () => { // Событие нажатия кнопки мыши
coin.classList.add('pressed'); // Добавляем класс 'pressed'
});

coin.addEventListener('mouseup', () => { // Событие отпускания кнопки мыши
coin.classList.remove('pressed'); // Удаляем класс 'pressed'
});

coin.addEventListener('touchstart', () => { // Для мобильных устройств (нажатие пальцем)
coin.classList.add('pressed');
});
coin.addEventListener('touchend', () => { // Для мобильных устройств (отпускание пальца)
coin.classList.remove('pressed');
});
