const mongoose = require('mongoose');

// Схема лобби для MongoDB
const lobbySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Название лобби, обязательно, убирает пробелы в начале и конце
  creator: { type: String, required: true }, // ID создателя лобби (обычно ObjectId пользователя)
  players: [{ type: String }], // Массив ID игроков, находящихся в лобби (обычно ObjectId пользователей)
  maxPlayers: { type: Number, default: 2, min: 2, max: 10 }, // Максимальное количество игроков (по умолчанию 2, минимум 2, максимум 10)
  status: { type: String, enum: ['waiting', 'playing', 'finished'], default: 'waiting' }, // Статус лобби (ожидание, игра, завершено)
  createdAt: { type: Date, default: Date.now }, // Дата создания лобби
  // Дополнительные поля, если необходимо:
  // coinFlipAmount: { type: Number, default: 10 }, // Сумма ставки в монетку (например)
});

// Создаем модель "Lobby" на основе схемы
module.exports = mongoose.model('Lobby', lobbySchema);
