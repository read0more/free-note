import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Item } from "../../common/types";
import styles from "./ItemHeader.module.css";

type Props = {
  item: Item;
  deleteItem: (id: string) => void;
};

const ItemHeader: React.FC<Props> = ({ item, deleteItem }) => {
  const onDeleteClick = (id: string) => () => deleteItem(id);

  return (
    <div className={styles.header}>
      <h2>{item.title}</h2>
      <div className={styles["icon-box"]}>
        <button className={styles.edit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className={styles.delete} onClick={onDeleteClick(item.id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default ItemHeader;
