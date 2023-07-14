const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

// Обработчик события подключения клиента
io.on("connection", (socket) => {
  console.log("Клиент подключился");

  // Обработчик события присоединения к сессии
  socket.on("joinSession", ({ sessionId }) => {
    const room = io.sockets.adapter.rooms.get(sessionId);
    // Присоединение клиента к комнате сессии
    if (room && room.size > 0) {
      // Присоединение клиента к комнате сессии
      socket.join(sessionId, () => {
        console.log(`Клиент присоединился к сессии ${sessionId}`);
      });
      socket.emit("joinSessionAnswer", true);
    } else {
      console.log(`Комната сессии ${sessionId} не существует`);
      socket.emit("joinSessionAnswer", false);
    }
  });

  /**
   * name - name player
   * total - start bank for the player
   * inGame - the player drop cards or no
   * bet - bet the player
   * dealerChip - the player have dealer chip or no
   * move - queue move the player or not
   **/
  socket.on("createSession", ({ sessionId, name, settings }) => {
    console.log(settings);
    socket.join(sessionId);
    // , () => {
    //     const sessionData = {
    //       sessionId: sessionId,
    //       data: [{ name, total: settings.startBank, inGame: true, bet: 0, dealerChip: true, move: false }],
    //       settings,
    //       activityName: [name],
    //     };
    //
    //     console.log(sessionData);
    //     socket.emit("createSessionAnswer", sessionData);
    //   }
    socket.emit("createSessionAnswer", sessionId);
  });

  // Обработчик события обновления объекта данных сессии
  socket.on("updateSessionData", (sessionId, newData) => {
    // В реальном приложении здесь будет обновление объекта данных сессии в базе данных или другом хранилище.

    // Отправка обновленных данных сессии всем клиентам в комнате сессии
    io.to(sessionId).emit("sessionDataUpdated", newData);
  });

  socket.on("disconnect", () => {
    console.log("Клиент отключился");
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
