import React from "react";
import { ItemId, Task } from "../../common/types";
import styles from "./TaskItem.module.css";

type Props = Omit<Task, "type"> & { toggleCheck: (id: ItemId) => void } & {
  id: ItemId;
};

const TaskItem: React.FC<Props> = ({
  id,
  title,
  body,
  checked,
  toggleCheck,
}) => {
  const onChange = () => {
    toggleCheck(id);
  };

  return (
    <article>
      <b className={styles.title}>{title}</b>
      <span>
        <input
          type="checkbox"
          id="input"
          className={styles.input}
          checked={checked}
          onChange={onChange}
        ></input>
        <label htmlFor="input" className={styles.label}>
          {body}
        </label>
      </span>
    </article>
  );
};

export default TaskItem;
