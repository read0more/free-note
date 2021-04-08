import React, { useRef } from "react";
import { Item, ItemId } from "../../common/types";
import styles from "./Section.module.css";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import ItemModal from "../ItemModal/ItemModal";

type Props = {
  items: Item[] | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: number, id2: number) => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
  addOrEditItem: (item: Item) => void;
};

const Section: React.FC<Props> = ({
  items,
  toggleCheck,
  deleteItem,
  swapItem,
  openModal,
  closeModal,
  addOrEditItem,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    swapItem(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={styles.section} ref={sectionRef}>
        <Droppable droppableId={"all-items"}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items &&
                items.map((item) => (
                  <ItemModal
                    key={item.id}
                    item={item}
                    addOrEditItem={addOrEditItem}
                    deleteItem={deleteItem}
                    toggleCheck={toggleCheck}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
};

export default Section;
