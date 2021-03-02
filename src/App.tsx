import React, { useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";

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
    id3: {
      type: "image",
      title: "이미지",
      url: "https://picsum.photos/600/200",
    },
    id4: {
      type: "video",
      title: "동영상",
      videoId: "QTwKr4_poRk",
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

  return (
    <div className={styles.app}>
      <Aside />
      <Main items={items} toggleCheck={toggleCheck} />
    </div>
  );
}

export default App;
