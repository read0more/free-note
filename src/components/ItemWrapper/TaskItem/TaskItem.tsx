import React from "react";
import { ItemId, Task } from "../../../common/types";
import styles from "./TaskItem.module.css";

type Props = Omit<Task, "type"> & {
  toggleCheck: (id: ItemId) => void;
  id: ItemId;
  titleStyle: string;
};

const TaskItem: React.FC<Props> = ({
  id,
  title,
  body,
  checked,
  toggleCheck,
  titleStyle,
}) => {
  const onChange = () => {
    toggleCheck(id);
  };

  return (
    <article>
      <h2 className={titleStyle}>{title}</h2>
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
    </article>
  );
};

export default TaskItem;
