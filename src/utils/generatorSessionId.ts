// Вспомогательная функция для генерации уникального идентификатора сессии
export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};
