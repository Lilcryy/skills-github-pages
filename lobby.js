/* lobby.js */

document.addEventListener('DOMContentLoaded', () => {
    const lobbyNameElement = document.getElementById('lobby-name');
    const betAmountElement = document.getElementById('bet-amount');
    const roundsElement = document.getElementById('rounds');
    const readyButton = document.getElementById('ready-button');

    // Функция для получения параметров из URL
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Получаем параметры из URL
    const lobbyName = getParameterByName('name');
    const betAmount = getParameterByName('betAmount');
    const rounds = getParameterByName('rounds');

    // Отображаем информацию о лобби на странице
    lobbyNameElement.textContent = lobbyName;
    betAmountElement.textContent = betAmount;
    roundsElement.textContent = rounds;

    // Обработчик кнопки "Готово"
    readyButton.addEventListener('click', () => {
        //  Реализуйте здесь логику после нажатия кнопки "Готово"
        alert('Вы готовы!');
    });
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

