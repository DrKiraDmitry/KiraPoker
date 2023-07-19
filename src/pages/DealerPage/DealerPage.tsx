import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/DealerPage.module.css";
import { DealerModal, ModalControllerEnum } from "../../components/DealerPage/DealerModal/DealerModal";
import { socket } from "../../utils/socketIO";
import { DealerController } from "../../../backend/src/DealerController";
import { PlayersContainer } from "../../components/DealerPage/PlayerCard/PlayersContainer/PlayersContainer";

export const DealerPage = () => {
  const { DealerSessionId } = useParams();
  const [modalController, setModalController] = useState(ModalControllerEnum.none);
  const [game, setGame] = useState<DealerController | null>(null);

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
    socket.on("gameAnswer", (x) => setGame(x));
    join();
    return () => {
      socket.off("gameAnswer", (x) => setGame(x));
    };
  }, []);

  return (
    <div className={styles.DealerPage}>
      {game && (
        <>
          <div>
            Игра под номером: {game.round}
            Круг: {game.circle}
            Банк: {game.bank}
            Ходит: {game.whoMoved}
            Круг идет: {String(game.thisCircleEnd)}
          </div>
          <PlayersContainer move={game.whoMoved} players={game.players} />
        </>
      )}
      {modalController === ModalControllerEnum.none && !game && (
        <button onClick={() => socket.emit("startGame", { sessionId: DealerSessionId })}>Старт</button>
      )}
      <DealerModal modalType={modalController} onClose={() => closeModal()} />
    </div>
  );
};
