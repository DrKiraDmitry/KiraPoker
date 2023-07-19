import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/DealerPage.module.css";
import { DealerModal, ModalControllerEnum } from "../../components/DealerPage/DealerModal/DealerModal";
import { socket } from "../../utils/socketIO";
import { DealerController } from "../../../backend/src/DealerController";
import { PlayersContainer } from "../../components/DealerPage/PlayerCard/PlayersContainer/PlayersContainer";
import { useStore } from "@nanostores/react";
import { $game, $setStore } from "../../stores/DealerStore";

export const DealerPage = () => {
  const { DealerSessionId } = useParams();
  const [modalController, setModalController] = useState(ModalControllerEnum.none);
  const store = useStore($game);

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
    function gameAnswer(x: DealerController) {
      $setStore(x);
    }
    socket.on("gameAnswer", gameAnswer);
    join();
    return () => {
      socket.off("gameAnswer", gameAnswer);
    };
  }, []);

  return (
    <div className={styles.DealerPage}>
      {store && (
        <>
          <div>
            Игра под номером: {store.round}
            Круг: {store.circle}
            Банк: {store.bank}
            Ходит: {store.whoMoved}
            Круг идет: {String(store.thisCircleEnd)}
          </div>
          <PlayersContainer players={store.players} />
        </>
      )}
      {modalController === ModalControllerEnum.none && !store && (
        <button onClick={() => socket.emit("startGame", { sessionId: DealerSessionId })}>Старт</button>
      )}
      <DealerModal modalType={modalController} onClose={() => closeModal()} />
    </div>
  );
};
