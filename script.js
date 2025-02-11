// script.js
document.addEventListener('DOMContentLoaded', () => {
  const balanceElement = document.getElementById('balance');
  const coinElement = document.getElementById('coin');
  const taskButtons = document.querySelectorAll('.task-button');

  let balance = 0;

  // Функция для обновления баланса на странице
  function updateBalance() {
    balanceElement.textContent = balance.toFixed(2) + ' FPI';
  }

  // Обработчик клика по монете
  coinElement.addEventListener('click', () => {
    balance += 0.01; // Начисление за клик
    updateBalance();
  });

  // Обработчики для кнопок заданий
  taskButtons.forEach(button => {
    button.addEventListener('click', () => {
      const reward = parseFloat(button.dataset.reward);
      balance += reward;
      updateBalance();
      alert(`Вы получили ${reward} FPI за выполнение задания!`); // Уведомление
    });
  });

  // Начальное обновление баланса
  updateBalance();
});
