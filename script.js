const navLinks = document.querySelectorAll('nav li');
const sections = document.querySelectorAll('main section');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        link.classList.add('active');
        const sectionId = link.dataset.section;
        document.getElementById(sectionId).classList.add('active');
    });
});

document.querySelector('nav li[data-section="home"]').click();

// Баланс
let balance = 0;
const balanceElement = document.getElementById('balance');
const clickButton = document.getElementById('click-button');

// Задания
const taskList = document.getElementById('task-list');
let tasks = [];

// Функция обновления заданий
function updateTasks() {
    tasks = [
        { id: 1, description: 'Подпишитесь на наш Telegram-канал', reward: 10 },
        { id: 2, description: 'Поставьте лайк последней записи в VK', reward: 15 },
        { id: 3, description: 'Пригласите друга по реферальной ссылке', reward: 25 }
    ];

    taskList.innerHTML = ''; // Очищаем список заданий

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description + ' (+' + task.reward + ')';
        taskList.appendChild(li);
    });

    // Сохраняем время обновления заданий в localStorage
    localStorage.setItem('lastTaskUpdate', Date.now());
}

// Функция проверки времени обновления заданий
function checkTaskUpdate() {
    const lastTaskUpdate = localStorage.getItem('lastTaskUpdate');

    if (!lastTaskUpdate || (Date.now() - lastTaskUpdate > 24 × 60 × 60 * 1000)) {
        // Если заданий нет в localStorage или прошло больше 24 часов, обновляем их
        updateTasks();
    } else {
        // Если задания есть в localStorage и прошло меньше 24 часов, загружаем их
        // (В данном примере не реализовано сохранение заданий в localStorage, только время обновления)
        updateTasks(); // Временное решение - просто обновляем задания каждый раз
    }
}

// Клик по кнопке
clickButton.addEventListener('click', () => {
    balance++;
    balanceElement.textContent = balance;
});

// Инициализация
checkTaskUpdate();
balanceElement.textContent = balance;
