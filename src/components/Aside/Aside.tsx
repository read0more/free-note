import React from "react";
import styles from "./Aside.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faStickyNote,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Item, ItemType } from "../../common/types";

type Props = {
  openFormModal: (item: Item) => void;
};

const Aside: React.FC<Props> = ({ openFormModal }) => {
  const onClick = (itemType: ItemType) => () => {
    const id = `${Date.now()}`;
    switch (itemType) {
      case "image":
        return openFormModal({
          id,
          type: "image",
          title: "",
          url: "",
        });
      case "video":
        return openFormModal({
          id,
          type: "video",
          title: "",
          videoId: "",
        });
      case "note":
        return openFormModal({
          id,
          type: "note",
          title: "",
          body: "",
        });
      case "task":
        return openFormModal({
          id,
          type: "task",
          title: "",
          body: "",
          checked: false,
        });
    }
  };

  return (
    <aside className={styles.aside}>
      <div className={styles["logo-box"]}>
        <FontAwesomeIcon
          icon={faImage}
          className={styles.logo}
          onClick={onClick("image")}
        />
        <p className={styles.text}>IMAGE</p>
      </div>
      <div className={styles["logo-box"]}>
        <FontAwesomeIcon
          icon={faYoutube}
          className={styles.logo}
          onClick={onClick("video")}
        />
        <p className={styles.text}>VIDEO</p>
      </div>
      <div className={styles["logo-box"]}>
        <FontAwesomeIcon
          icon={faStickyNote}
          className={styles.logo}
          onClick={onClick("note")}
        />
        <p className={styles.text}>NOTE</p>
      </div>
      <div className={styles["logo-box"]}>
        <FontAwesomeIcon
          icon={faTasks}
          className={styles.logo}
          onClick={onClick("task")}
        />
        <p className={styles.text}>TASK</p>
      </div>
    </aside>
  );
};

export default Aside;
