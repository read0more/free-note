import React from "react";
import { Note } from "../../common/types";
import styles from "./NoteItem.module.css";

const NoteItem: React.FC<Omit<Note, "id" | "type">> = ({ title, body }) => (
  <article>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.body}>{body}</p>
  </article>
);

export default NoteItem;
