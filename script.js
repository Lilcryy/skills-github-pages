document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const coinImage = document.getElementById('coin-image'); // Получаем ссылку на изображение монеты
    const coinElement = document.getElementById('coin');
    const energyFill = document.getElementById('energy-fill');
    const energyText = document.getElementById('energy-text');
    const tasksContainer = document.querySelector('.tasks-container');
    const contentDiv = document.getElementById('content'); // Получаем элемент для контента
    const loadingIndicator = document.getElementById('loading-indicator');
    contentDiv = document.getElementById('content'); // Получаем элемент для контента
    loadingIndicator = document.getElementById('loading-indicator'); // Получаем индикатор загрузки

    // Получаем элементы уведомлений
    const notificationContainer = document.getElementById('notification-container');
    const notificationBox = document.getElementById('notification-box');
    const notificationMessage = document.getElementById('notification-message');
    const notificationCloseButton = document.getElementById('notification-close-button');

    let balance = parseFloat(localStorage.getItem('balance')) || 0;
    let energy = parseFloat(localStorage.getItem('energy')) || 100;
    const maxEnergy = 100;
    const energyCost = 1;
    const recoveryTime = 3;

    // Инициализация баланса и энергии при загрузке страницы
    updateBalance();
    updateEnergy();

    console.log('Баланс при загрузке:', balance);
    console.log('Энергия при загрузке:', energy);

    // Загрузка SVG
    function loadSvg(path) {
        coinImage.src = path;
    }

    // Функция для отображения уведомления
    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationContainer.style.display = 'flex'; // Показываем контейнер
    }

    // Функция для скрытия уведомления
    function hideNotification() {
        notificationContainer.style.display = 'none'; // Скрываем контейнер
    }

    // Обработчик нажатия на кнопку закрытия уведомления
    notificationCloseButton.addEventListener('click', hideNotification);

    // Функция для обновления баланса на странице
    function updateBalance() {
        balanceElement.textContent = balance.toFixed(2) + ' FPI';
        localStorage.setItem('balance', balance.toFixed(2));
        console.log('Баланс обновлен:', balance);
    }

    // Функция для обновления энергии
    function updateEnergy() {
        const energyPercentage = (energy / maxEnergy) * 100;
        energyFill.style.width = `${energyPercentage}%`;
        energyText.textContent = `${energy}/${maxEnergy}`;
        localStorage.setItem('energy', energy.toFixed(2));
        console.log('Энергия обновлена:', energy);
    }

    // Функция для проверки, доступно ли задание
    function isTaskAvailable(taskName) {
        const lastClaimed = localStorage.getItem(`task_${taskName}_claimed`);
        if (!lastClaimed) {
            return true;
        }

        const lastClaimedDate = new Date(lastClaimed);
        const now = new Date();
        const diffInHours = (now.getTime() - lastClaimedDate.getTime()) / (1000 * 60 * 60);

        return diffInHours >= 24;
    }

    // Функция для блокировки кнопки задания
    function disableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = true;
        button.textContent = 'Выполнено';
        button.classList.add('task-button-disabled');
        taskCard.classList.add('completed');
    }

    // Функция для разблокировки кнопки задания
    function enableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = false;
        button.textContent = 'Выполнить';
        button.classList.remove('task-button-disabled');
        taskCard.classList.remove('completed');
    }

    // Функция для увеличения баланса
    function increaseBalanceFromClick() {
        console.log('Нажата монетка. Текущая энергия:', energy);
        if (energy >= energyCost) {
            energy -= energyCost;
            updateEnergy();
            balance += 0.01;
            updateBalance();
            console.log('Баланс увеличен, энергия уменьшена. Новый баланс:', balance, 'Новая энергия:', energy);
        } else {
            showNotification('Недостаточно энергии!'); // Отображаем наше уведомление
            console.log('Недостаточно энергии!');
        }
    };

    // Функция для восстановления энергии
    function recoverEnergy() {
        if (energy < maxEnergy) {
            energy = Math.min(maxEnergy, energy + 1); // Убедимся, что энергия не превышает maxEnergy
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

    // Обработчики для кнопок заданий
    tasksContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.task-button');

        if (button) {
            const taskCard = button.closest('.task-card');
            const taskName = taskCard.dataset.task;

            if (!isTaskAvailable(taskName)) {
                showNotification('Это задание можно выполнить только через 24 часа!'); // Отображаем наше уведомление
                return;
            }

            const reward = parseFloat(button.dataset.reward);
            balance += reward;
            updateBalance();
            showNotification(`Вы получили ${reward} FPI за выполнение задания!`); // Отображаем наше уведомление

            // Сохраняем время выполнения задания
            localStorage.setItem(`task_${taskName}_claimed`, new Date().toISOString());
            disableTaskButton(taskCard);

            // Открываем ссылку на Telegram в новой вкладке
            if (taskName === 'join-telegram') {
                window.open('https://t.me/Alekszovru', '_blank');
            }
        }
    });

    // Обработчик клика на монету
    coinElement.addEventListener('click', () => {
        increaseBalanceFromClick();
    });

    // Вызываем функцию для проверки доступности заданий при загрузке страницы
    checkTasksAvailability();

    // Загружаем SVG при загрузке страницы
    loadSvg(localStorage.getItem('selectedCoin') || 'coin.png');
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
    // Функция для отображения индикатора загрузки
    function showLoadingIndicator() {
        loadingIndicator.style.display = 'block';
    }

    // Функция для скрытия индикатора загрузки
    function hideLoadingIndicator() {
        loadingIndicator.style.display = 'none';
    }

    // Функция для загрузки контента страницы
    async function loadPage(url) {
        showLoadingIndicator(); // Показываем индикатор загрузки

        try {
            const response = await fetch(url);
            const html = await response.text();

            // Извлекаем содержимое <main id="content">...</main> из загруженной страницы
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('content').innerHTML;

            contentDiv.innerHTML = newContent; // Заменяем контент

            history.pushState({ url: url }, '', url); // Обновляем URL в адресной строке
        } catch (error) {
            console.error('Ошибка при загрузке страницы:', error);
            contentDiv.innerHTML = '<p>Ошибка при загрузке контента.</p>'; // Обработка ошибок
        } finally {
            hideLoadingIndicator(); // Скрываем индикатор загрузки после завершения
            window.scrollTo(0, 0); // Прокручиваем в начало страницы
        }
    }

    // Перехватываем клики по ссылкам в футере
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем обычный переход по ссылке
            const pageUrl = this.getAttribute('data-page'); // Получаем URL страницы из атрибута data-page
            loadPage(pageUrl); // Загружаем страницу
        });
    });

    // Обработка навигации по истории (кнопки "назад" и "вперед" в браузере)
    window.addEventListener('popstate', function (event) {
        if (event.state) {
            loadPage(event.state.url); // Загружаем страницу из состояния истории
        }
    });

    // Загрузка контента при загрузке страницы (если есть хеш)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
