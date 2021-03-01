import React, { useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Section from "./components/Section/Section";

function App() {
  const [items, setItems] = useState<Record<ItemId, Item>>({
    "1": {
      type: "note",
      title: "타이트을",
      body: "바디이",
    },
    "2": {
      type: "task",
      title: "태스크",
      body: "태스크 바디",
    },
  });

  const SectionComponent = () => <Section items={items} />;

  return (
    <div className={styles.app}>
      <Aside />
      <Main Section={SectionComponent} />
    </div>
  );
}

export default App;
