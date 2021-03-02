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
import AddForm from "../AddForm/AddForm";

type Props = {
  addItem: (item: Item) => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const Aside: React.FC<Props> = ({ addItem, openModal, closeModal }) => {
  const onClick = (itemType: ItemType) => {
    return () => {
      openModal(
        <AddForm
          itemType={itemType}
          addItem={addItem}
          closeModal={closeModal}
        />
      );
    };
  };

  return (
    <aside className={styles.aside}>
      <FontAwesomeIcon
        icon={faImage}
        className={styles.logo}
        onClick={onClick("image")}
      />
      <FontAwesomeIcon
        icon={faYoutube}
        className={styles.logo}
        onClick={onClick("video")}
      />
      <FontAwesomeIcon
        icon={faStickyNote}
        className={styles.logo}
        onClick={onClick("note")}
      />
      <FontAwesomeIcon
        icon={faTasks}
        className={styles.logo}
        onClick={onClick("task")}
      />
    </aside>
  );
};

export default Aside;
