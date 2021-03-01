import React, { useState } from "react";
import styles from "./App.module.css";
import { Item } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Section from "./components/Section/Section";

function App() {
  const [items, setItems] = useState<Item[]>([
    {
      type: "note",
      title: "타이트을",
      body: "바디이",
    },
  ]);
  const SectionComponent = () => <Section items={items} />;

  return (
    <div className={styles.app}>
      <Aside />
      <Main Section={SectionComponent} />
    </div>
  );
}

export default App;
