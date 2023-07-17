import React, { FC, useRef } from "react";
import { Input } from "../../../../UI/Input/Input";

export const SettingRoom: FC<{ onClose: () => void }> = ({ onClose }) => {
  const bigBlind = useRef(15);
  const smallBlind = useRef(10);
  const startBank = useRef(1000);

  const save = () => {
    const setting = {
      bigBlind: bigBlind.current,
      smallBlind: smallBlind.current,
      startBank: startBank.current,
    };
    window.localStorage.setItem("settings", JSON.stringify(setting));
    onClose();
  };

  return (
    <div>
      <div>Команата еще не создана давай настроим её</div>
      <Input
        value={bigBlind.current}
        title={"Блайнд"}
        min={15}
        required={true}
        type="number"
        onChange={(e) => (bigBlind.current = Number(e.target.value))}
      />
      <Input
        value={smallBlind.current}
        title={"Малый Блайнд"}
        min={10}
        required={true}
        type="number"
        onChange={(e) => (smallBlind.current = Number(e.target.value))}
      />
      <Input
        value={startBank.current}
        title={"Стартовый капитал"}
        min={1000}
        required={true}
        type="number"
        onChange={(e) => (startBank.current = Number(e.target.value))}
      />
      <button onClick={() => save()}>Сохранить</button>
    </div>
  );
};
