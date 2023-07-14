import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/MainPage.module.css";
import { generateSessionId } from "../../utils/generatorSessionId";
import { DescriptionMods, ModEnum } from "../../components/MainPage/DesctiptionMods/DescriptionMods";

export const MainPage = () => {
  const [mode, setMode] = useState<ModEnum>(ModEnum.none);
  return (
    <div className={styles.MainPage}>
      <h1 className={styles.MainPage__title}>Kira Poker</h1>
      <div className={styles.MainPage__desc}>
        <DescriptionMods mode={mode} />
      </div>
      <div className={styles.MainPage__nav}>
        <Link
          className={styles.MainPage__link}
          to={`/DealerRoom/${generateSessionId()}`}
          onMouseEnter={() => setMode(ModEnum.dealer)}
          onMouseLeave={() => setMode(ModEnum.none)}
          onFocus={() => setMode(ModEnum.dealer)}
          onBlur={() => setMode(ModEnum.none)}
        >
          Команта Диллера
        </Link>
        <button
          className={styles.MainPage__link}
          onMouseEnter={() => setMode(ModEnum.poker)}
          onMouseLeave={() => setMode(ModEnum.none)}
          onFocus={() => setMode(ModEnum.poker)}
          onBlur={() => setMode(ModEnum.none)}
        >
          Команта Покера
        </button>
      </div>
    </div>
  );
};
