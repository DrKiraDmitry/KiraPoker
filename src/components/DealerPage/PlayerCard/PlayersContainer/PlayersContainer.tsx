import React, { FC } from "react";
import { Player } from "../../../../../backend/src/player";
import styles from "./styles/PlayersContainer.module.css";
import { PlayerCard } from "../PlayerCard/PlayerCard";

export const PlayersContainer: FC<{ players: Player[] }> = ({ players }) => {
  return (
    <div className={styles.PlayersContainer}>
      {players.map((el) => (
        <PlayerCard player={el} key={el.name} />
      ))}
    </div>
  );
};
