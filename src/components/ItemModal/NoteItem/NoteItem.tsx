import React, { useRef } from "react";
import { Item, Note } from "../../../common/types";
import styles from "./NoteItem.module.css";

type Props = {
  item: Note;
  addOrEditItem: (item: Item) => void;
};

const NoteItem: React.FC<Props> = ({ item, addOrEditItem }) => {
  const { body } = item;
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const onChange = () => {
    addOrEditItem({ ...item, body: bodyRef.current?.value ?? "" });
  };

  return (
    <textarea
      className={styles.body}
      onChange={onChange}
      ref={bodyRef}
      defaultValue={body}
    />
  );
};

export default NoteItem;
