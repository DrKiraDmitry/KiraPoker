import { useState } from "react";

export const useSendForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledSend, setDisabledSend] = useState(false);

  const sendForm = async () => {
    if (disabledSend) return;
    if (!email && !password) return;

    setDisabledSend(true);

    const body = {
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:8080", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
      alert("Sorry, our back is not working, but we promise you that we will fix it soon");
    } finally {
      setDisabledSend(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    disabledSend,
    sendForm,
  };
};
