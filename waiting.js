/* waiting.js */

document.addEventListener('DOMContentLoaded', () => {
    const lobbyIdElement = document.getElementById('lobby-id');

    // Функция для получения параметра из URL
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const lobbyId = getParameterByName('lobbyId');
    lobbyIdElement.textContent = lobbyId;

    // Подключаемся к WebSocket (ЗАМЕНИТЕ ЭТО НА ВАШ URL)
    const websocket = new WebSocket('ws://ваш-сервер:8080'); // Пример URL

    websocket.addEventListener('open', () => {
        console.log('Подключено к WebSocket');
        // Отправляем ID лобби на сервер, чтобы сообщить, что мы ожидаем
        websocket.send(JSON.stringify({ type: 'waiting', lobbyId: lobbyId }));
    });

    websocket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'gameStart') {
            // Перенаправляем на страницу игры
            window.location.href = `game.html?lobbyId=${lobbyId}`;
        } else {
            console.log('Получено сообщение:', message);
        }
    });

    websocket.addEventListener('close', () => {
        console.log('Соединение с WebSocket закрыто');
    });

    websocket.addEventListener('error', (error) => {
        console.error('Ошибка WebSocket:', error);
    });
});
