import React, { useRef } from "react";
import { Item, ItemId } from "../../common/types";
import styles from "./Section.module.css";
import ItemWrapper from "../ItemWrapper/ItemWrapper";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type Props = {
  items: Item[] | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: number, id2: number) => void;
  openFormModal: (item: Item) => void;
};

const Section: React.FC<Props> = ({
  items,
  toggleCheck,
  deleteItem,
  swapItem,
  openFormModal,
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
                items.map((item, index) => (
                  <ItemWrapper
                    key={item.id}
                    item={item}
                    index={index}
                    toggleCheck={toggleCheck}
                    deleteItem={deleteItem}
                    swapItem={swapItem}
                    openFormModal={openFormModal}
                    sectionRef={sectionRef}
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
