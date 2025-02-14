document.addEventListener('DOMContentLoaded', () => {
    // Переменные
    const balanceElement = document.getElementById('balance');
    const coinImage = document.getElementById('coin-image');
    const coinElement = document.getElementById('coin');
    const energyFill = document.getElementById('energy-fill');
    const energyText = document.getElementById('energy-text');
    const tasksContainer = document.querySelector('.tasks-container');
    const notificationContainer = document.getElementById('notification-container');
    const notificationBox = document.getElementById('notification-box');
    const notificationMessage = document.getElementById('notification-message');
    const notificationCloseButton = document.getElementById('notification-close-button');

    // Получаем все кнопки "Купить" в магазине
    const buyButtons = document.querySelectorAll('.buy-button');
    const fpiUpgradeButton = document.getElementById('fpi-upgrade-button');
    const autoFpiUpgradeButton = document.getElementById('auto-fpi-upgrade-button');
    const energyUpgradeButton = document.getElementById('energy-upgrade-button');
    const fpiButton = document.getElementById('fpi-button');
    const fpiLabel = document.getElementById('fpi-label');

    let fpi = parseFloat(localStorage.getItem('fpi')) || 0; // Использовать fpi вместо balance
    let energy = parseFloat(localStorage.getItem('energy')) || 100;
    let maxEnergy = parseFloat(localStorage.getItem('maxEnergy')) || 100;
    let fpiPerClick = 1;
    const energyCost = 1;
    const recoveryTime = 3;
    let autoFpiRate = parseFloat(localStorage.getItem('autoFpiRate')) || 0;
    let autoEnergyRate = 0;

    const energyUpgradeAmount = 200;
    const energyUpgradeCost = 100;
    const energyIncreaseCost = 500; // Цена увеличения maxEnergy
    const energyIncreaseAmount = 50; // Количество, на которое увеличивается maxEnergy


    updateUI(); // Вызываем updateUI, а не отдельные функции
    checkTasksAvailability();

    function loadSvg(path) {
        coinImage.src = path;
    }

    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationContainer.style.display = 'flex';
    }

    function hideNotification() {
        notificationContainer.style.display = 'none';
    }

    notificationCloseButton.addEventListener('click', hideNotification);

    //Обновленный updateUI
    function updateUI() {
        const energyPercentage = (energy / maxEnergy) * 100;

        if (energyFill) {
            energyFill.style.width = `${energyPercentage}%`;
        }
        if (energyText) {
            energyText.textContent = `${energy}/${maxEnergy}`;
        }
        if (fpiLabel) {
            fpiLabel.textContent = `FPI: ${fpi.toFixed(2)}`;
        }
        if (balanceElement) {
            balanceElement.textContent = `${fpi.toFixed(2)} FPI`;
        }

        localStorage.setItem('fpi', fpi.toFixed(2));
        localStorage.setItem('energy', energy.toFixed(2));
        localStorage.setItem('autoFpiRate', autoFpiRate.toFixed(2));
        localStorage.setItem('maxEnergy', maxEnergy.toFixed(2)); // Сохраняем maxEnergy
    }

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

    function disableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = true;
        button.textContent = 'Выполнено';
        button.classList.add('task-button-disabled');
        taskCard.classList.add('completed');
    }

    function enableTaskButton(taskCard) {
        const button = taskCard.querySelector('.task-button');
        button.disabled = false;
        button.textContent = 'Выполнить';
        button.classList.remove('task-button-disabled');
        taskCard.classList.remove('completed');
    }

    function increaseBalanceFromClick() {
        if (energy >= energyCost) {
            energy -= energyCost;
            fpi += 0.01;
            updateUI();
        } else {
            showNotification('Недостаточно энергии!');
        }
    };

    function recoverEnergy() {
        if (energy < maxEnergy) {
            energy = Math.min(maxEnergy, energy + 1);
            updateUI();
        }
    }

    setInterval(recoverEnergy, recoveryTime * 1000);

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

    // Обновленные функции улучшений
    function upgradeFPI() {
        if (fpi >= 10) {
            fpi -= 10;
            fpiPerClick++;
            updateUI();
            fpiButton.textContent = `Generate FPI (+${fpiPerClick})`;
        } else {
            showNotification("Недостаточно FPI для улучшения!");
        }
    }

    function unlockAutoFPI() {
        if (fpi >= 50) {
            fpi -= 50;
            autoFpiRate = 1;
            updateUI();
        } else {
            showNotification("Недостаточно FPI для разблокировки автоматической генерации!");
        }
    }

    function refillEnergy() {
        if (fpi >= energyUpgradeCost) {
            fpi -= energyUpgradeCost;
            energy = Math.min(maxEnergy, energy + energyUpgradeAmount);
            updateUI();
        } else {
            showNotification("Недостаточно FPI для пополнения энергии!");
        }
    }

    function buyCoin(price) {
        if (fpi >= price) {
            fpi -= price;
            updateUI();
            showNotification("Спасибо за покупку!");
        } else {
            showNotification("Недостаточно FPI для покупки этой монеты!");
        }
    }

     function increaseMaxEnergy(price) {
        if (fpi >= price) {
            fpi -= price;
            maxEnergy += energyIncreaseAmount;
            energy = Math.min(maxEnergy, energy + energyIncreaseAmount); // Увеличиваем текущую энергию до нового максимума
            updateUI();
            showNotification(`Максимальный запас энергии увеличен на ${energyIncreaseAmount}!`);
        } else {
            showNotification("Недостаточно FPI для увеличения запаса энергии!");
        }
    }

    // Функция для автоматической генерации
    function autoGenerate() {
        if (energy < maxEnergy) {
            energy = Math.min(maxEnergy, energy + autoEnergyRate / 10);
        }
        fpi += autoFpiRate / 10;
        updateUI();
    }

    // Привязываем функции к кнопкам
    fpiButton.addEventListener('click', () => {
        if (energy >= energyCost) {
            energy -= energyCost;
            fpi += fpiPerClick;
            updateUI();
        } else {
            showNotification('Недостаточно энергии!');
        }
    });

    fpiUpgradeButton.addEventListener('click', upgradeFPI);
    autoFpiUpgradeButton.addEventListener('click', unlockAutoFPI);
    energyUpgradeButton.addEventListener('click', refillEnergy);
    coinElement.addEventListener('click', () => {
        increaseBalanceFromClick();
    });

    // Привязываем функцию покупки к кнопкам
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const price = parseInt(this.dataset.price);
            const action = this.dataset.action; // Получаем action
            if (action === 'increaseMaxEnergy') {
                increaseMaxEnergy(price);
            } else {
                buyCoin(price); // Для старых кнопок - купить монету
            }
        });
    });

        //Обработчики для touch
    coinElement.addEventListener('mousedown', () => {
        coinElement.classList.add('pressed');
    });

    coinElement.addEventListener('mouseup', () => {
        coinElement.classList.remove('pressed');
    });

    coinElement.addEventListener('touchstart', () => {
        coinElement.classList.add('pressed');
    });

    coinElement.addEventListener('touchend', () => {
        coinElement.classList.remove('pressed');
    });

    tasksContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.task-button');

        if (button) {
            const taskCard = button.closest('.task-card');
            const taskName = taskCard.dataset.task;

            if (!isTaskAvailable(taskName)) {
                showNotification('Это задание можно выполнить только через 24 часа!');
                return;
            }

            const reward = parseFloat(button.dataset.reward);
            fpi += reward;
            updateUI();
            showNotification(`Вы получили ${reward} FPI за выполнение задания!`);

            localStorage.setItem(`task_${taskName}_claimed`, new Date().toISOString());
            disableTaskButton(taskCard);

        }
    });
   //loadSvg(localStorage.getItem('selectedCoin') || 'coin.png');

        setInterval(autoGenerate, 100);
});
