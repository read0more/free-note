import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Modal.module.css";

type Props = {
  children: JSX.Element;
  closeModal: () => void;
};

const Modal: React.FC<Props> = ({ children, closeModal }) => {
  return (
    <>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.wrapper}>
        <>
          {children}
          <button className={styles.close} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      </div>
    </>
  );
};

export default Modal;
