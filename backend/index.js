const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const {Player} = require("./player");

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
  socket.on("joinSession", ({sessionId, name}) => {
    const room = io.sockets.adapter.rooms.get(sessionId)
    
    if (!room && !room.size > 0) {
      console.log(`Комната сессии ${sessionId} не существует`);
      return socket.emit("joinSessionAnswer", false);
    }
    
    socket.join(sessionId);
    console.log(`Клиент присоединился к сессии ${sessionId}`);
    return  socket.emit("joinSessionAnswer", true);
  });

  socket.on("createSession", ({sessionId, name, settings}) => {
    socket.join(sessionId);
    console.log(`Cоздана комната ${sessionId}`);
    const sessionData = {
      sessionId: sessionId,
      data: [new Player({name})],
      settings,
      activityName: [name],
    };

    const room = io.sockets.adapter.rooms.get(sessionId);
    room.sessionData = sessionData;
    socket.emit("createSessionAnswer", room);
  });


  socket.on("disconnect", () => {
    console.log("Клиент отключился");
  });
});


const port = 3001;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
