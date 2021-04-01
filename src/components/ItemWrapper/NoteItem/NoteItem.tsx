import React from "react";
import { Note } from "../../../common/types";
import styles from "./NoteItem.module.css";

const NoteItem: React.FC<
  Omit<Note, "id" | "type"> & { titleStyle: string }
> = ({ title, body, titleStyle }) => (
  <article>
    <h2 className={titleStyle}>{title}</h2>
    <p className={styles.body}>{body}</p>
  </article>
);

export default NoteItem;
