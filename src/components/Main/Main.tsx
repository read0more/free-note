import React from "react";
import { Item, ItemId } from "../../common/types";
import Section from "../Section/Section";
import styles from "./Main.module.css";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
};

const Main: React.FC<Props> = ({ items, toggleCheck, deleteItem }) => (
  <main className={styles.main}>
    <h1 className={styles.title}>Free Note</h1>
    <Section items={items} toggleCheck={toggleCheck} deleteItem={deleteItem} />
  </main>
);

export default Main;
