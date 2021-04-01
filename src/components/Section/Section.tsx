import React, { useRef } from "react";
import { Item, ItemId } from "../../common/types";
import styles from "./Section.module.css";
import ItemWrapper from "../ItemWrapper/ItemWrapper";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: string, id2: string) => void;
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

  return (
    <section className={styles.section} ref={sectionRef}>
      <ul>
        {items &&
          Object.keys(items).map((id) => (
            <ItemWrapper
              item={items[id]}
              toggleCheck={toggleCheck}
              deleteItem={deleteItem}
              swapItem={swapItem}
              openFormModal={openFormModal}
              sectionRef={sectionRef}
            />
          ))}
      </ul>
    </section>
  );
};

export default Section;
