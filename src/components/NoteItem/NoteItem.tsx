import React from "react";
import { Note } from "../../common/types";
import styles from "./NoteItem.module.css";

const NoteItem: React.FC<Omit<Note, "type">> = ({ title, body }) => (
  <article className={styles.article}>
    <b className={styles.title}>{title}</b>
    <div>{body}</div>
    <span className={styles.delete}>❌</span>
  </article>
);

export default NoteItem;
