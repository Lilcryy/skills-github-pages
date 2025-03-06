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


