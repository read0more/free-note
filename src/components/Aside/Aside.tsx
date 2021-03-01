import React from "react";
import styles from "./Aside.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faStickyNote,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <FontAwesomeIcon icon={faImage} className={styles.logo} />
      <FontAwesomeIcon icon={faYoutube} className={styles.logo} />
      <FontAwesomeIcon icon={faStickyNote} className={styles.logo} />
      <FontAwesomeIcon icon={faTasks} className={styles.logo} />
    </aside>
  );
};

export default Aside;
