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
        fetch('/createLobby', { // Пример URL
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
// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*" //Разрешите все источники в целях разработки.
    }
});

app.use(express.json());

// Для простоты, храним лобби в памяти (В РЕАЛЬНОМ ПРИЛОЖЕНИИ - БАЗА ДАННЫХ)
const lobbies = {};

// API endpoint для создания лобби
app.post('/createLobby', (req, res) => {
    const { name, betAmount, rounds } = req.body;

    if (!name || !betAmount || !rounds) {
        return res.status(400).json({ success: false, message: 'Не все поля заполнены' });
    }

    const lobbyId = generateLobbyId(); // Функция для генерации уникального ID
    lobbies[lobbyId] = {
        name,
        betAmount,
        rounds,
        players: [],
        status: 'waiting'
    };

    res.json({ success: true, lobbyId: lobbyId });
});

io.on('connection', (socket) => {
    console.log('Новый клиент подключился');

    socket.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'waiting') {
            const lobbyId = data.lobbyId;
            if (lobbies[lobbyId]) {
                lobbies[lobbyId].players.push(socket.id); // Добавляем ID сокета игрока
                socket.join(lobbyId); // Присоединяем сокет к "комнате" лобби
                console.log(`Игрок ${socket.id} ожидает в лобби ${lobbyId}`);

                // Если в лобби уже 2 игрока, начинаем игру
                if (lobbies[lobbyId].players.length === 2) {
                    io.to(lobbyId).emit('message', JSON.stringify({ type: 'gameStart' })); // Отправляем всем в комнате
                    lobbies[lobbyId].status = 'playing';
                    console.log(`Игра начинается в лобби ${lobbyId}`);
                }
            } else {
                console.log(`Лобби ${lobbyId} не найдено`);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Клиент отключился');
        // TODO: Удалить игрока из лобби, если он был в нем
    });
});

function generateLobbyId() {
    return Math.random().toString(36).substring(2, 15); //  Простая генерация ID
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
