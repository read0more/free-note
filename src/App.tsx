import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Item, ItemId } from "./common/types";
import AddForm from "./components/ItemForm/ItemForm";
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

  const addOrEditItem = (item: Item) => {
    const updated = { ...items, [item.id]: { ...item } };
    setItems(updated);
    saveItem(updated);
  };

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const openFormModal = (item: Item) => {
    openModal(
      <AddForm
        item={item}
        addOrEditItem={addOrEditItem}
        closeModal={closeModal}
      />
    );
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
      updated[id1].id = id1;
      updated[id2].id = id2;
      saveItem(updated);
      return updated;
    });
  };

  return (
    <div className={styles.app}>
      <Aside openFormModal={openFormModal} />
      <Main
        items={items}
        toggleCheck={toggleCheck}
        deleteItem={deleteItem}
        swapItem={swapItem}
        openFormModal={openFormModal}
      />
      {modalContent && <Modal closeModal={closeModal}>{modalContent}</Modal>}
    </div>
  );
}

export default App;
