import React, { useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

function App() {
  const [items, setItems] = useState<Record<ItemId, Item>>();
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const toggleCheck = (id: ItemId) => {
    if (!items) {
      return;
    }

    const target = items[id];

    if (target.type !== "task") {
      return;
    }

    setItems({
      ...items,
      [id]: { ...target, checked: !target.checked },
    });
  };

  const addItem = (item: Item) => {
    const id = Date.now();
    setItems({ ...items, [id]: { ...item } });
  };

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className={styles.app}>
      <Aside addItem={addItem} openModal={openModal} closeModal={closeModal} />
      <Main items={items} toggleCheck={toggleCheck} />
      {modalContent && <Modal closeModal={closeModal}>{modalContent}</Modal>}
    </div>
  );
}

export default App;
