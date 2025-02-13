document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const coinElement = document.getElementById('coin');
    const taskButtons = document.querySelectorAll('.task-button');
    const energyFill = document.getElementById('energy-fill');
    const energyText = document.getElementById('energy-text');
    const tasksContainer = document.querySelector('.tasks-container');  // Добавлено

    let balance = parseFloat(localStorage.getItem('balance')) || 100000;
    let energy = 100;
    const maxEnergy = 100;
    const energyCost = 1; // Стоимость одного нажатия
    const recoveryTime = 3; // Время восстановления 1 энергии в секундах

    // Функция для обновления баланса на странице
    function updateBalance() {
        balanceElement.textContent = balance.toFixed(2) + ' FPI';
        localStorage.setItem('balance', balance.toFixed(2)); // Сохраняем баланс
    }

    // Функция для обновления энергии
    function updateEnergy() {
        energyFill.style.width = `${energy}%`;
        energyText.textContent = `${energy}/${maxEnergy}`;
    }

    // Функция для проверки, доступно ли задание
    function isTaskAvailable(taskName) {
        const lastClaimed = localStorage.getItem(`task_${taskName}_claimed`);
        if (!lastClaimed) {
            return true; // Задание еще не выполнялось
        }

        const lastClaimedDate = new Date(lastClaimed);
        const now = new Date();
        const diffInHours = (now.getTime() - lastClaimedDate.getTime()) / (1000 × 60 × 60);

        return diffInHours >= 24; // Доступно, если прошло 24 часа
    }

    // Функция для блокировки кнопки задания
    function disableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = true;
        button.textContent = 'Выполнено';
        button.classList.add('task-button-disabled');
        taskCard.classList.add('completed');  // Добавляем класс completed к карточке
    }

    // Функция для разблокировки кнопки задания
    function enableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = false;
        button.textContent = 'Выполнить';
        button.classList.remove('task-button-disabled');
        taskCard.classList.remove('completed');  // Убираем класс completed из карточки
    }

    // Функция для увеличения баланса
    window.increaseBalance = () => {
        if (energy >= energyCost) {
            energy -= energyCost;
            updateEnergy();
            balance += 0.01;
            updateBalance();
        } else {
            alert('Недостаточно энергии!');
        }
    };

    // Функция для восстановления энергии
    function recoverEnergy() {
        if (energy < maxEnergy) {
            energy++;
            updateEnergy();
        }
    }

    // Восстановление энергии каждые recoveryTime секунд
    setInterval(recoverEnergy, recoveryTime * 1000);

    // Функция для проверки и обновления состояния кнопок заданий при загрузке страницы
    function checkTasksAvailability() {
        document.querySelectorAll('.task-card').forEach(taskCard => {
            const taskName = taskCard.dataset.task;
            if (isTaskAvailable(taskName)) {
                enableTaskButton(taskCard);
            } else {
                disableTaskButton(taskCard);
            }
        });
    }

    // Обработчики для кнопок заданий (перемещено внутрь DOMContentLoaded)
    tasksContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.task-button');

        if (button) {
            const taskCard = button.closest('.task-card');
            const taskName = taskCard.dataset.task;

            if (!isTaskAvailable(taskName)) {
                alert('Это задание можно выполнить только через 24 часа!');
                return;
            }

            const reward = parseFloat(button.dataset.reward);
            balance += reward;
            updateBalance();
            alert(`Вы получили ${reward} FPI за выполнение задания!`);

            // Сохраняем время выполнения задания
            localStorage.setItem(`task_${taskName}_claimed`, new Date().toISOString());
            disableTaskButton(taskCard);

            // Открываем ссылку на Telegram в новой вкладке
            if (taskName === 'join-telegram') {
                window.open('https://t.me/Alekszovru', '_blank');
            }
        }
    });

    // Вызываем функцию для проверки доступности заданий при загрузке страницы
    checkTasksAvailability();

    // Инициализация
    updateBalance();
    updateEnergy();
});

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
