import React from "react";
import { getLocationFromRatio, getSizeFromRatio } from "../../common/helpers";
import { Item, ItemId } from "../../common/types";
import ImageItem from "./ImageItem/ImageItem";
import styles from "./ItemModal.module.css";
import NoteItem from "./NoteItem/NoteItem";
import VideoItem from "./VideoItem/VideoItem";
import TaskItem from "./TaskItem/TaskItem";
import ItemHeader from "./ItemHeader";

type Props = {
  item: Item;
  addOrEditItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  toggleCheck: (id: ItemId) => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const ItemModal: React.FC<Props> = ({
  item,
  addOrEditItem,
  deleteItem,
  toggleCheck,
  openModal,
  closeModal,
}) => {
  const location = getLocationFromRatio(
    document.body,
    item.leftRatio!,
    item.topRatio!
  );
  const size = getSizeFromRatio(
    document.body,
    item.widthRatio!,
    item.heightRatio!
  );

  const style = {
    top: location.top,
    left: location.left,
    width: size.width,
    height: size.height,
  } as React.CSSProperties;

  const getItemComponent = (item: Item) => {
    switch (item.type) {
      case "image":
        return (
          <ImageItem
            item={item}
            addOrEditItem={addOrEditItem}
            openModal={openModal}
            closeModal={closeModal}
          />
        );
      case "video":
        return (
          <VideoItem
            item={item}
            addOrEditItem={addOrEditItem}
            openModal={openModal}
            closeModal={closeModal}
          />
        );
      case "note":
        return <NoteItem item={item} addOrEditItem={addOrEditItem} />;
      case "task":
        return <TaskItem item={item} toggleCheck={toggleCheck} />;
      default:
        throw new Error("알 수 없는 아이템 타입");
    }
  };

  return (
    <li style={style} className={styles.list}>
      <ItemHeader item={item} deleteItem={deleteItem} />
      {getItemComponent(item)}
    </li>
  );
};

export default ItemModal;
