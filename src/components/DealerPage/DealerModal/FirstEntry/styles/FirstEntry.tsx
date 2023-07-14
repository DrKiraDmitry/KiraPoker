import React, { FC, useRef } from "react";

export const FirstEntry: FC<{ onClose: () => void }> = ({ onClose }) => {
  const name = useRef("");

  const save = () => {
    window.localStorage.setItem("name", name.current);
    onClose();
  };

  return (
    <div>
      <div>Ты первый раз зашел выбери себе имя, будь аккуратен я не знаю когда сделаю смену имени</div>
      <input required={true} minLength={2} type="text" onChange={(e) => (name.current = e.target.value)} />
      <button onClick={() => save()}>Сохранить</button>
    </div>
  );
};
