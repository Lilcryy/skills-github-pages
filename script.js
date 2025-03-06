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
        if (!lobbyList) {
            console.error("Элемент с классом '.lobby-list' не найден в DOM.");
            return;
        }

        lobbyList.innerHTML = ''; // Очищаем список

        lobbies.forEach((lobby, index) => { // Используем index для lobbyId
            const lobbyItem = document.createElement('div');
            lobbyItem.classList.add('lobby-item');
            lobbyItem.innerHTML = `
                <h3>${lobby.name}</h3>
                <p>Ставка: ${lobby.betAmount} руб.</p>
                <p>Раунды: ${lobby.rounds}</p>
                <button class="join-button" data-lobby-id="${index}">Присоединиться</button>
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

        // Создаем новый объект лобби
        const newLobby = {
            name: lobbyName,
            betAmount: betAmount,
            rounds: rounds
        };

        // Добавляем лобби в массив
        lobbies.push(newLobby);

        // Отображаем обновленный список лобби
        displayLobbies();

        // Очищаем поля формы
        lobbyNameInput.value = '';
        betAmountInput.value = '';
        roundsInput.value = '';

        // Обновляем предпросмотр
        previewLobbyName.textContent = '';
        previewBetAmount.textContent = '';
        previewRounds.textContent = '';
    });

    // Изначальное отображение лобби (если есть какие-то данные по умолчанию)
    displayLobbies();
});
