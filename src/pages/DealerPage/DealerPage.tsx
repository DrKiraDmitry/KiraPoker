﻿import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/DealerPage.module.css";
import { DealerModal, ModalControllerEnum } from "../../components/DealerPage/DealerModal/DealerModal";
import { socket } from "../../utils/socketIO";

export const DealerPage = () => {
  const { DealerSessionId } = useParams();
  const [modalController, setModalController] = useState(ModalControllerEnum.none);

  const closeModal = () => {
    const m = modalController;
    setModalController(ModalControllerEnum.none);
    if (m === ModalControllerEnum.firstEntry) join();
    if (m === ModalControllerEnum.settingRoom) create();
  };

  const join = () => {
    const name = window.localStorage.getItem("name");
    if (!name) return setModalController(ModalControllerEnum.firstEntry);

    let join = false;
    socket.emit("joinSession", { sessionId: DealerSessionId });
    socket.on("joinSessionAnswer", (x) => (join = x));
    if (!join) return setModalController(ModalControllerEnum.settingRoom);
  };

  const create = () => {
    const settings = window.localStorage.getItem("settings");
    const name = window.localStorage.getItem("name");
    if (settings && name)
      socket.emit("createSession", { sessionId: DealerSessionId, name, settings: JSON.parse(settings) });
    socket.emit("joinSession", { sessionId: DealerSessionId, name });
    socket.on("joinSessionAnswer", (x) => console.log(x));
  };

  useEffect(() => {
    socket.connect();
    join();
  }, []);

  return (
    <div className={styles.DealerPage}>
      <button onClick={() => socket.emit("startGame")}>Старт</button>
      <DealerModal modalType={modalController} onClose={() => closeModal()} />
    </div>
  );
};
