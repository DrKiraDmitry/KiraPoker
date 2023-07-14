import React, { FC, useRef } from "react";

export const SettingRoom: FC<{ onClose: () => void }> = ({ onClose }) => {
  const blind = useRef(10);
  const smallBlind = useRef(5);
  const startBank = useRef(1000);

  const save = () => {
    const setting = {
      blind,
      smallBlind,
      startBank,
    };
    window.localStorage.setItem("setting", JSON.stringify(setting));
    onClose();
  };

  return (
    <div>
      <div>Команата еще не создана давай настроим её</div>
      <input required={true} type="number" onChange={(e) => (blind.current = Number(e.target.value))} />
      <input required={true} type="number" onChange={(e) => (smallBlind.current = Number(e.target.value))} />
      <input required={true} type="number" onChange={(e) => (startBank.current = Number(e.target.value))} />
      <button onClick={() => save()}>Сохранить</button>
    </div>
  );
};
