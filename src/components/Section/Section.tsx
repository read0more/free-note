import React from "react";
import { Item, ItemId } from "../../common/types";
import NoteItem from "../NoteItem/NoteItem";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Section.module.css";

type Props = {
  items: Record<ItemId, Item>;
};

const Section: React.FC<Props> = ({ items }) => {
  const getItemComponent = (item: Item) => {
    console.log(item);
    switch (item.type) {
      case "image":
        return;
      case "video":
        return;
      case "note":
        return <NoteItem title={item.title} body={item.body} />;
      case "task":
        return <TaskItem title={item.title} body={item.body} />;
    }
  };

  return (
    <section className={styles.section}>
      <ul>
        {Object.keys(items).map((key) => (
          <li className={styles.item}>{getItemComponent(items[key])}</li>
        ))}
      </ul>
    </section>
  );
};

export default Section;
