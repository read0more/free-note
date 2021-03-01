import React, { useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Section from "./components/Section/Section";

function App() {
  const [items, setItems] = useState<Record<ItemId, Item>>({
    id1: {
      type: "note",
      title: "타이트을",
      body: "바디이",
    },
    id2: {
      type: "task",
      title: "태스크",
      body: "태스크 바디",
      checked: true,
    },
  });

  const toggleCheck = (id: ItemId) => {
    const target = items[id];

    if (target.type !== "task") {
      return;
    }

    setItems({
      ...items,
      [id]: { ...target, checked: !target.checked },
    });
  };

  const SectionComponent = () => (
    <Section items={items} toggleCheck={toggleCheck} />
  );

  return (
    <div className={styles.app}>
      <Aside />
      <Main Section={SectionComponent} />
    </div>
  );
}

export default App;
