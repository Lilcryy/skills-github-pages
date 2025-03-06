/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const lobbyForm = document.getElementById('lobby-form');
    const lobbyNameInput = document.getElementById('lobby-name');
    const betAmountInput = document.getElementById('bet-amount');
    const roundsInput = document.getElementById('rounds');
    const previewLobbyName = document.getElementById('preview-lobby-name');
    const previewBetAmount = document.getElementById('preview-bet-amount');
    const previewRounds = document.getElementById('preview-rounds');
    const lobbyList = document.querySelector('.lobby-list');

    // Массив для хранения лобби (в реальной разработке это будет база данных)
    const lobbies = [];

    // Функция для отображения лобби
    function displayLobbies() {
        lobbyList.innerHTML = ''; // Очищаем список

        lobbies.forEach(lobby => {
            const lobbyItem = document.createElement('div');
            lobbyItem.classList.add('lobby-item');
            lobbyItem.innerHTML = `
                <h3>${lobby.name}</h3>
                <p>Ставка: ${lobby.betAmount} руб.</p>
                <p>Раунды: ${lobby.rounds}</p>
                <button class="join-button" data-lobby-id="${lobbies.indexOf(lobby)}">Присоединиться</button>
            `;
            lobbyList.appendChild(lobbyItem);
        });

        // Добавляем обработчики событий для кнопок "Присоединиться"
        const joinButtons = document.querySelectorAll('.join-button');
        joinButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lobbyId = this.dataset.lobbyId;
                joinLobby(lobbyId);
            });
        });
    }

    // Функция для присоединения к лобби
    function joinLobby(lobbyId) {
        // Получаем данные о лобби по ID
        const lobby = lobbies[lobbyId];

        // Проверяем, что лобби существует
        if (!lobby) {
            alert('Лобби не найдено!');
            return;
        }

        // Здесь нужно отправить запрос на сервер, чтобы присоединиться к лобби
        // (пока что просто перенаправляем на страницу lobby.html)
        const url = `lobby.html?lobbyId=${lobbyId}&name=${encodeURIComponent(lobby.name)}&betAmount=${lobby.betAmount}&rounds=${lobby.rounds}`;
        window.location.href = url; // Перенаправляем в lobby.html
    }


    // Обновление предпросмотра при изменении значений полей
    lobbyNameInput.addEventListener('input', () => previewLobbyName.textContent = lobbyNameInput.value);
    betAmountInput.addEventListener('input', () => previewBetAmount.textContent = betAmountInput.value);
    roundsInput.addEventListener('input', () => previewRounds.textContent = roundsInput.value);

    lobbyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        const lobbyName = lobbyNameInput.value;
        const betAmount = parseInt(betAmountInput.value);
        const rounds = parseInt(roundsInput.value);

        // Валидация данных (можно добавить более сложные проверки)
        if (!lobbyName || isNaN(betAmount) || isNaN(rounds)) {
            alert('Пожалуйста, заполните все поля корректно.');
            return;
        }

        // Отправляем запрос на сервер для создания лобби (ЗАМЕНИТЕ ЭТО НА ВАШ URL)
        fetch('http://localhost:8080/lobbies', { // Пример URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: lobbyName,
                betAmount: betAmount,
                rounds: rounds
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Перенаправляем на страницу ожидания с ID лобби
                window.location.href = `waiting.html?lobbyId=${data.lobbyId}`;
            } else {
                alert('Ошибка при создании лобби: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при создании лобби.');
        });
    });

    // Первоначальное отображение лобби (если есть)
    displayLobbies();
});
// client.js

document.addEventListener('DOMContentLoaded', () => {
    const lobbyList = document.getElementById('lobbyList'); // Получаем ссылку на элемент, где будем отображать список лобби
    const createLobbyForm = document.getElementById('createLobbyForm'); // Форма создания лобби
    const errorMessage = document.getElementById('errorMessage');

    // Функция для получения списка лобби с сервера
    async function fetchLobbies() {
        try {
            const response = await fetch('/lobbies'); // Запрос к серверу на получение списка лобби
            const data = await response.json(); // Преобразуем ответ в JSON

            if (data.success) {
                displayLobbies(data.lobbies); // Отображаем список лобби
            } else {
                // Выводим сообщение об ошибке, если запрос не удался
                errorMessage.textContent = 'Ошибка при получении списка лобби: ' + data.message;
            }
        } catch (error) {
            // Обрабатываем ошибки сети или другие непредвиденные ошибки
            errorMessage.textContent = 'Произошла ошибка при получении списка лобби.';
            console.error('Ошибка:', error);
        }
    }

    // Функция для отображения списка лобби на странице
    function displayLobbies(lobbies) {
        // Очищаем список лобби перед добавлением новых элементов
        lobbyList.innerHTML = '';

        // Если лобби не найдены, выводим сообщение
        if (!lobbies || lobbies.length === 0) {
            lobbyList.innerHTML = '<p>Нет доступных лобби.</p>';
            return;
        }

        // Для каждого лобби создаем HTML-элемент
        lobbies.forEach(lobby => {
            const lobbyItem = document.createElement('div');
            lobbyItem.classList.add('lobby-item'); // Добавляем класс для стилизации
            lobbyItem.innerHTML = `
                <h3>${lobby.name}</h3>
                <p>Ставка: ${lobby.betAmount} руб.</p>
                <p>Раунды: ${lobby.rounds}</p>
                <button class="joinButton" data-lobby-id="${lobby.id}">Присоединиться</button>
            `;
            lobbyList.appendChild(lobbyItem); // Добавляем элемент в список
        });

        // Добавляем обработчики событий для кнопок "Присоединиться"
        const joinButtons = document.querySelectorAll('.joinButton');
        joinButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lobbyId = this.dataset.lobbyId; // Получаем ID лобби из атрибута data-lobby-id
                joinLobby(lobbyId); // Вызываем функцию для присоединения к лобби
            });
        });
    }

    // Функция для присоединения к лобби
    function joinLobby(lobbyId) {
        // Выполняем перенаправление на страницу лобби
        // Используем window.location.href для изменения URL
        window.location.href = `lobby.html?lobbyId=${lobbyId}`;
    }

    // Функция для создания лобби
    async function createLobby(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Получаем значения из полей формы
        const name = document.getElementById('lobbyName').value;
        const betAmount = document.getElementById('betAmount').value;
        const rounds = document.getElementById('rounds').value;

        try {
            // Отправляем POST-запрос на сервер для создания лобби
            const response = await fetch('/lobbies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, betAmount, rounds })
            });

            const data = await response.json(); // Преобразуем ответ в JSON

            if (data.success) {
                // Перенаправляем на страницу лобби после успешного создания
                window.location.href = `lobby.html?lobbyId=${data.lobbyId}`;
            } else {
                // Выводим сообщение об ошибке, если создание не удалось
                errorMessage.textContent = 'Ошибка при создании лобби: ' + data.message;
            }
        } catch (error) {
            // Обрабатываем ошибки сети или другие непредвиденные ошибки
            errorMessage.textContent = 'Произошла ошибка при создании лобби.';
            console.error('Ошибка:', error);
        }
    }

    // Добавляем обработчик события для отправки формы создания лобби
    createLobbyForm.addEventListener('submit', createLobby);

    // Вызываем функцию для получения списка лобби при загрузке страницы
    fetchLobbies();
});
