import React from "react";
import { ItemId, Task } from "../../../common/types";
import styles from "./TaskItem.module.css";

type Props = {
  item: Task;
  toggleCheck: (id: ItemId) => void;
};

const TaskItem: React.FC<Props> = ({ item, toggleCheck }) => {
  const { id, body, checked } = item;

  const onChange = () => {
    toggleCheck(id);
  };

  return (
    <>
      <span>
        <input
          type="checkbox"
          id={id}
          className={styles.input}
          checked={checked}
          onChange={onChange}
        ></input>
        <label htmlFor={id} className={styles.label}>
          {body}
        </label>
      </span>
    </>
  );
};

export default TaskItem;
