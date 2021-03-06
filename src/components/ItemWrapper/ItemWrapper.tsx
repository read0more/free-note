import React, { RefObject } from "react";
import { Item, ItemId } from "../../common/types";
import ImageItem from "./ImageItem/ImageItem";
import NoteItem from "./NoteItem/NoteItem";
import TaskItem from "./TaskItem/TaskItem";
import VideoItem from "./VideoItem/VideoItem";
import styles from "./ItemWrapper.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTimes,
  faArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  item: Item;
  index: number;
  sectionRef: RefObject<HTMLElement>;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: number, id2: number) => void;
  openFormModal: (item: Item) => void;
};

const ItemWrapper: React.FC<Props> = ({
  item,
  index,
  sectionRef,
  toggleCheck,
  deleteItem,
  swapItem,
  openFormModal,
}) => {
  const onDeleteClick = (id: string) => () => deleteItem(id);
  const onEditClick = (item: Item) => () => openFormModal(item);

  const getItemComponent = (item: Item) => {
    switch (item.type) {
      case "image":
        return (
          <ImageItem
            title={item.title}
            url={item.url}
            titleStyle={styles.title}
          />
        );
      case "video":
        return (
          <VideoItem
            title={item.title}
            videoId={item.videoId}
            titleStyle={styles.title}
          />
        );
      case "note":
        return (
          <NoteItem
            title={item.title}
            body={item.body}
            titleStyle={styles.title}
          />
        );
      case "task":
        return (
          <TaskItem
            id={item.id}
            title={item.title}
            body={item.body}
            checked={item.checked}
            toggleCheck={toggleCheck}
            titleStyle={styles.title}
          />
        );
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={styles.item}
        >
          {getItemComponent(item)}
          <div className={styles["icon-box"]}>
            <button className={styles.delete} onClick={onDeleteClick(item.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className={styles.edit} onClick={onEditClick(item)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className={styles.move} {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faArrowsAlt} />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ItemWrapper;
