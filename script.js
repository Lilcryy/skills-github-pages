// script.js
document.addEventListener('DOMContentLoaded', () => {
  const balanceElement = document.getElementById('balance');
  const coinElement = document.getElementById('coin');
  const taskButtons = document.querySelectorAll('.task-button');
  const energyFill = document.getElementById('energy-fill');
  const energyText = document.getElementById('energy-text');

  let balance = 0;
  let energy = 100;
  const maxEnergy = 100;
  const energyCost = 1; // Стоимость одного нажатия
  const recoveryTime = 3; // Время восстановления 1 энергии в секундах

  // Функция для обновления баланса на странице
  function updateBalance() {
    balanceElement.textContent = balance.toFixed(2) + ' FPI';
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
  function disableTaskButton(button) {
    button.disabled = true;
    button.textContent = 'Выполнено';
    button.classList.add('task-button-disabled');
  }

  // Функция для разблокировки кнопки задания
  function enableTaskButton(button) {
    button.disabled = false;
    button.textContent = 'Выполнить';
    button.classList.remove('task-button-disabled');
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

  // Обработчики для кнопок заданий
  taskButtons.forEach(button => {
    const taskName = button.dataset.task;

    // Проверяем, доступно ли задание при загрузке страницы
    if (!isTaskAvailable(taskName)) {
      disableTaskButton(button);
    }

    button.addEventListener('click', () => {
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
      disableTaskButton(button);
    });
  });

  // Проверяем и обновляем состояние кнопок заданий при загрузке страницы
  function checkTasksAvailability() {
    taskButtons.forEach(button => {
      const taskName = button.dataset.task;
      if (isTaskAvailable(taskName)) {
        enableTaskButton(button);
      } else {
        disableTaskButton(button);
      }
    });
  }

  // Вызываем функцию для проверки доступности заданий при загрузке страницы
  checkTasksAvailability();

  // Инициализация
  updateBalance();
  updateEnergy();
});
