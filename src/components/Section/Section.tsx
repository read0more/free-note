import React from "react";
import { Item, ItemId } from "../../common/types";
import NoteItem from "../NoteItem/NoteItem";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Section.module.css";

type Props = {
  items: Record<ItemId, Item>;
  toggleCheck: (id: ItemId) => void;
};

const Section: React.FC<Props> = ({ items, toggleCheck }) => {
  const getItemComponent = (key: ItemId, item: Item) => {
    switch (item.type) {
      case "image":
        return;
      case "video":
        return;
      case "note":
        return <NoteItem title={item.title} body={item.body} />;
      case "task":
        return (
          <TaskItem
            id={key}
            title={item.title}
            body={item.body}
            checked={item.checked}
            toggleCheck={toggleCheck}
          />
        );
    }
  };

  return (
    <section className={styles.section}>
      <ul>
        {Object.keys(items).map((key) => (
          <li key={key} className={styles.item}>
            {getItemComponent(key, items[key])}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section;
