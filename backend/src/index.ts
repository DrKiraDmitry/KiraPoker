import express from "express";
import http from "http";
import { Server } from "socket.io";
import { DealerController } from "./DealerController";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
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
  socket.on("joinSession", ({ sessionId, name }) => {
    const room = io.sockets.adapter.rooms.get(sessionId);

    if (!room) {
      console.log(`Комната сессии ${sessionId} не существует`);
      return socket.emit("joinSessionAnswer", false);
    }

    //@ts-ignore
    const dealer = room?.sessionData.dealer;
    dealer.joinPlayer(name);
    socket.join(sessionId);
    console.log(`Клиент присоединился к сессии ${sessionId}`);
    return socket.emit("joinSessionAnswer", dealer);
  });

  socket.on("startGame", ({ sessionId, name }) => {
    const room = io.sockets.adapter.rooms.get(sessionId);

    if (!room) {
      console.log(`Комната сессии ${sessionId} не существует`);
      return socket.emit("joinSessionAnswer", false);
    }

    //@ts-ignore
    const dealer = room?.sessionData.dealer;
    dealer.startRound();
    return socket.emit("gameAnswer", dealer);
  });

  socket.on("actionCheck", ({ sessionId, name }) => {
    const room = io.sockets.adapter.rooms.get(sessionId);

    if (!room) {
      console.log(`Комната сессии ${sessionId} не существует`);
      return socket.emit("joinSessionAnswer", false);
    }

    //@ts-ignore
    const dealer = room?.sessionData.dealer;
    dealer.actionCheck();
    return socket.emit("gameAnswer", dealer);
  });

  socket.on("actionFold", ({ sessionId, name }) => {
    const room = io.sockets.adapter.rooms.get(sessionId);

    if (!room) {
      console.log(`Комната сессии ${sessionId} не существует`);
      return socket.emit("joinSessionAnswer", false);
    }

    //@ts-ignore
    const dealer = room?.sessionData.dealer;
    dealer.actionFold();
    return socket.emit("gameAnswer", dealer);
  });

  socket.on("createSession", ({ sessionId, name, settings }) => {
    socket.join(sessionId);
    console.log(`Cоздана комната ${sessionId}`);
    const sessionData = {
      sessionId: sessionId,
      dealer: new DealerController(settings),
      // data: [new Player({name})],
      // settings,
      // activityName: [name],
    };

    const room = io.sockets.adapter.rooms.get(sessionId);

    //@ts-ignore
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
