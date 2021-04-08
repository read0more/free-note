import React, { useRef } from "react";
import styles from "./UrlForm.module.css";

type Props = {
  callback?: Function;
  afterSubmit?: Function;
};

const UrlForm: React.FC<Props> = ({ callback, afterSubmit }) => {
  const urlRef = useRef<HTMLInputElement>(null);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback && callback(urlRef.current?.value);
    afterSubmit && afterSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="url"
        ref={urlRef}
        placeholder={"URL을 입력해주세요."}
        className={styles.input}
        required
      />
    </form>
  );
};

export default UrlForm;
