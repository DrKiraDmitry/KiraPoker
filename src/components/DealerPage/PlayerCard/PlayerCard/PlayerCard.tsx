import React, { FC } from "react";
import { Player } from "../../../../../backend/src/player";
import styles from "./styles/PlayerCard.module.css";
import { socket } from "../../../../utils/socketIO";
import { useParams } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $game } from "../../../../stores/DealerStore";

export const PlayerCard: FC<{ player: Player }> = ({ player }) => {
  const { DealerSessionId } = useParams();
  const store = useStore($game);

  return (
    <div className={styles.PlayerCard}>
      <div>Имя: {player.name}</div>
      <div>Состояние: {player.total}</div>
      <div>Ставка: {player.bet}</div>
      <div>Умер: {player.defeat}</div>
      <div>В игре: {player.inGame ? "Да" : "Нет"}</div>
      <div>Проверен: {player.checked ? "Да" : "Нет"}</div>
      {!store?.thisCircleEnd && store?.whoMoved === player.name && (
        <div className={styles.PlayerCard__bottom}>
          {store.topBetInCircle <= player.bet && (
            <button onClick={() => socket.emit("actionCheck", { sessionId: DealerSessionId })}>Чек</button>
          )}
          <button onClick={() => socket.emit("actionFold", { sessionId: DealerSessionId })}>Сбросить</button>
          <button>Повысить</button>
        </div>
      )}
    </div>
  );
};
