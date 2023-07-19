import React, { FC } from "react";
import { Player } from "../../../../../backend/src/player";
import styles from "./styles/PlayerCard.module.css";
import { socket } from "../../../../utils/socketIO";
import { useParams } from "react-router-dom";

export const PlayerCard: FC<{ player: Player; move: string }> = ({ player, move }) => {
  const { DealerSessionId } = useParams();

  return (
    <div className={styles.PlayerCard}>
      <div>Имя: {player.name}</div>
      <div>Состояние: {player.total}</div>
      <div>Ставка: {player.bet}</div>
      <div>Умер: {player.defeat}</div>
      <div>В игре: {player.inGame ? "Да" : "Нет"}</div>
      {move === player.name && (
        <div className={styles.PlayerCard__bottom}>
          <button onClick={() => socket.emit("actionCheck", { sessionId: DealerSessionId })}>Чек</button>
          <button>Сбросить</button>
          <button>Повысить</button>
        </div>
      )}
    </div>
  );
};
