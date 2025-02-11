let balance = 0;
const balanceAmount = document.getElementById("balance-amount");
const mintTokenButton = document.getElementById("mint-token");
const taskButtons = document.querySelectorAll(".task-button");

// Функция для обновления баланса
function updateBalance() {
    balanceAmount.textContent = balance;
}

// Функция для получения токенов при нажатии на монетку
mintTokenButton.addEventListener("click", () => {
    balance += 1;
    updateBalance();
});

// Обработчики для выполнения заданий
taskButtons.forEach(button => {
    button.addEventListener("click", () => {
        const reward = parseInt(button.dataset.reward);
        balance += reward;
        updateBalance();
        // Здесь нужно добавить логику проверки выполнения задания
        alert("Задание выполнено! + " + reward + " FPI");  // Заглушка
    });
});

// Инициализация баланса
updateBalance();
