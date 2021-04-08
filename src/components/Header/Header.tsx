import styles from "./Header.module.css";
import React from "react";
import { Item, ItemType } from "../../common/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faStickyNote,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

type props = {
  title: string;
  addOrEditItem: (item: Item) => void;
};

const DEFAULT_ITEM_TITLE = "제목";

const Header: React.FC<props> = ({ title, addOrEditItem }) => {
  const onClick = (itemType: ItemType) => () => {
    const id = `${Date.now()}`;
    const title = DEFAULT_ITEM_TITLE;
    switch (itemType) {
      case "image":
        return addOrEditItem({
          id,
          type: "image",
          title,
          url: "",
        });
      case "video":
        return addOrEditItem({
          id,
          type: "video",
          title,
          videoId: "",
        });
      case "note":
        return addOrEditItem({
          id,
          type: "note",
          title,
          body: "",
        });
      case "task":
        return addOrEditItem({
          id,
          type: "task",
          title,
          body: "",
          checked: false,
        });
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.menu}>
        <li className={styles["logo-box"]}>
          <FontAwesomeIcon
            icon={faImage}
            className={styles.logo}
            onClick={onClick("image")}
          />
        </li>
        <li className={styles["logo-box"]}>
          <FontAwesomeIcon
            icon={faYoutube}
            className={styles.logo}
            onClick={onClick("video")}
          />
        </li>
        <li className={styles["logo-box"]}>
          <FontAwesomeIcon
            icon={faStickyNote}
            className={styles.logo}
            onClick={onClick("note")}
          />
        </li>
        <li className={styles["logo-box"]}>
          <FontAwesomeIcon
            icon={faTasks}
            className={styles.logo}
            onClick={onClick("task")}
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;
