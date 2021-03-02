import React from "react";
import { Item, ItemId } from "../../common/types";
import NoteItem from "../NoteItem/NoteItem";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Section.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageItem from "../ImageItem/ImageItem";
import VideoItem from "../VideoItem/VideoItem";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
};

const Section: React.FC<Props> = ({ items, toggleCheck, deleteItem }) => {
  const getItemComponent = (key: ItemId, item: Item) => {
    switch (item.type) {
      case "image":
        return <ImageItem title={item.title} url={item.url} />;
      case "video":
        return <VideoItem title={item.title} videoId={item.videoId} />;
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

  const onClick = (id: string) => () => deleteItem(id);

  return (
    <section className={styles.section}>
      <ul>
        {items &&
          Object.keys(items).map((id) => (
            <li key={id} className={styles.item}>
              {getItemComponent(id, items[id])}
              <div className={styles.delete} onClick={onClick(id)}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Section;
