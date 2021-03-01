import React from "react";
import { Task } from "../../common/types";
import styles from "./TaskItem.module.css";

const TaskItem: React.FC<Omit<Task, "type">> = ({ title, body }) => (
  <article className={styles.article}>
    <b className={styles.title}>{title}</b>
    <input type="checkbox" id="body"></input>
    <label htmlFor="body">{body}</label>
    <span className={styles.delete}>❌</span>
  </article>
);

export default TaskItem;
