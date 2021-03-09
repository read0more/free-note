import React from "react";
import { Item, ItemId } from "../../common/types";
import Section from "../Section/Section";
import styles from "./Main.module.css";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: string, id2: string) => void;
  openFormModal: (item: Item) => void;
};

const Main: React.FC<Props> = ({
  items,
  toggleCheck,
  deleteItem,
  swapItem,
  openFormModal,
}) => (
  <main className={styles.main}>
    <h1 className={styles.title}>Free Note</h1>
    <Section
      items={items}
      toggleCheck={toggleCheck}
      deleteItem={deleteItem}
      swapItem={swapItem}
      openFormModal={openFormModal}
    />
  </main>
);

export default Main;
