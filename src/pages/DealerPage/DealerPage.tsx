import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/DealerPage.module.css";
import { DealerModal, ModalControllerEnum } from "../../components/DealerPage/DealerModal/DealerModal";
import { socket } from "../../utils/socketIO";

export const DealerPage = () => {
  const { DealerSessionId } = useParams();
  const [modalController, setModalController] = useState(ModalControllerEnum.none);

  const checkUserName = () => {
    const name = window.localStorage.getItem("name");
    if (!name) return setModalController(ModalControllerEnum.firstEntry);
  };

  const closeModal = () => {
    setModalController(ModalControllerEnum.none);
    join();
  };

  const join = () => {
    checkUserName();
    let join = false;
    socket.connect();
    socket.emit("joinSession", { sessionId: DealerSessionId });
    socket.on("joinSessionAnswer", (x) => (join = x));
    if (!join) return setModalController(ModalControllerEnum.settingRoom);
    const setting = window.localStorage.getItem("setting");
  };

  useEffect(() => {
    join();
  }, []);

  return (
    <div className={styles.DealerPage}>
      <DealerModal modalType={modalController} onClose={() => closeModal()} />
    </div>
  );
};
