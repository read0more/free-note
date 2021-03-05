import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

function App() {
  const [items, setItems] = useState<Record<ItemId, Item>>();
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setItems(JSON.parse(items) as Record<ItemId, Item>);
    }
  }, []);

  const toggleCheck = (id: ItemId) => {
    if (!items) {
      return;
    }

    const target = items[id];

    if (target.type !== "task") {
      return;
    }

    const updated = {
      ...items,
      [id]: { ...target, checked: !target.checked },
    };
    setItems(updated);
    saveItem(updated);
  };

  const saveItem = (items: Record<ItemId, Item>) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  const addItem = (item: Item) => {
    const id = Date.now();
    const updated = { ...items, [id]: { ...item } };
    setItems(updated);
    saveItem(updated);
  };

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const deleteItem = (id: string) => {
    setItems((items) => {
      const updated = { ...items };
      delete updated[id];
      saveItem(updated);
      return updated;
    });
  };

  const swapItem = (id1: string, id2: string) => {
    if (!id1 || !id2) {
      return;
    }

    if (id1 === id2) {
      return;
    }

    setItems((items) => {
      const updated = { ...items };
      [updated[id1], updated[id2]] = [updated[id2], updated[id1]];
      saveItem(updated);
      return updated;
    });
  };

  return (
    <div className={styles.app}>
      <Aside addItem={addItem} openModal={openModal} closeModal={closeModal} />
      <Main
        items={items}
        toggleCheck={toggleCheck}
        deleteItem={deleteItem}
        swapItem={swapItem}
      />
      {modalContent && <Modal closeModal={closeModal}>{modalContent}</Modal>}
    </div>
  );
}

export default App;
