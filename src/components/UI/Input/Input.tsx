import React, { FC, InputHTMLAttributes, useState } from "react";
import styles from "./styles/Input.module.css";
import { LockIcon } from "./lock";

export const Input: FC<{ title?: string } & InputHTMLAttributes<any>> = ({ title, ...props }) => {
  return (
    <label className={styles.Input__label}>
      {title && <div className={styles.Input__title} dangerouslySetInnerHTML={{ __html: title }} />}
      <input className={styles.Input} {...props} />
    </label>
  );
};

export const InputPassword: FC<
  { title?: string; type?: "password" | "text"; showPassEvent?: (type: string) => void } & InputHTMLAttributes<any>
> = ({ title, type = "password", showPassEvent, ...props }) => {
  const [typeState, setTypeState] = useState(type);

  const showPass = () => {
    const x = typeState === "password" ? "text" : "password";
    setTypeState(x);
    if (!!showPassEvent) showPassEvent(x);
  };

  return (
    <label className={styles.Input__label}>
      {title && <div className={styles.Input__title} dangerouslySetInnerHTML={{ __html: title }} />}
      <div style={{ position: "relative", display: "flex" }}>
        <input type={typeState} style={{ width: "100%" }} className={styles.Input} {...props} />
        <button
          type={"button"}
          aria-label="Show password"
          className={styles.Input__showPass}
          onClick={() => showPass()}
          onMouseDown={(e) => {
            e.preventDefault(); // to keep input focus on click
          }}
        >
          <LockIcon open={typeState === "text"} />
        </button>
      </div>
    </label>
  );
};
