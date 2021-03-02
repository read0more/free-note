import React from "react";
import { Item, ItemId } from "../../common/types";
import Section from "../Section/Section";
import styles from "./Main.module.css";

type Props = {
  items: Record<ItemId, Item>;
  toggleCheck: (id: ItemId) => void;
};

const Main: React.FC<Props> = ({ items, toggleCheck }) => (
  <main className={styles.main}>
    <h1 className={styles.title}>Free Note</h1>
    <Section items={items} toggleCheck={toggleCheck} />
  </main>
);

export default Main;
