import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import "./common/item.css";
import { Item, ItemId } from "./common/types";
import Header from "./components/Header/Header";
import AddForm from "./components/ItemForm/ItemForm";
import Modal from "./components/Modal/Modal";
import Section from "./components/Section/Section";

type stateType = { items: Record<ItemId, Item>; itemOrder: string[] };

function App() {
  const [state, setState] = useState<stateType>();
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const storageState = localStorage.getItem("state");
    if (storageState) {
      setState(JSON.parse(storageState));
    }
  }, []);

  const getItems = () => {
    return state?.itemOrder.map((itemId) => state.items[itemId]);
  };

  const toggleCheck = (id: ItemId) => {
    if (!state) {
      return;
    }

    const target = state.items[id];

    if (target.type !== "task") {
      return;
    }

    const newItems = { ...state.items };
    newItems[id] = { ...target, checked: !target.checked };

    const newState: stateType = { ...state, items: newItems };
    setState(newState);
    saveItem(newState);
  };

  const saveItem = (items: stateType) => {
    localStorage.setItem("state", JSON.stringify(items));
  };

  const addOrEditItem = (item: Item) => {
    const newItems = state
      ? { ...state.items, [item.id]: item }
      : { [item.id]: item };
    const newItemOrder = state ? [...state.itemOrder] : [];

    if (!state?.items[item.id]) {
      newItemOrder.push(item.id);
    }

    const newState: stateType = { items: newItems, itemOrder: newItemOrder };
    setState(newState);
    saveItem(newState);
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
    if (!state) {
      return;
    }

    const filteredItems = { ...state.items };
    delete filteredItems[id];
    const filteredItemOrder = state.itemOrder.filter((itemId) => itemId !== id);

    const newState: stateType = {
      items: filteredItems,
      itemOrder: filteredItemOrder,
    };
    setState(newState);
    saveItem(newState);
  };

  const swapItem = (sourceOrder: number, destinationOrder: number) => {
    if (!state) {
      return;
    }

    if (sourceOrder === destinationOrder) {
      return;
    }

    const newItemOrder = [...state.itemOrder];
    const sourceItemId = state.itemOrder[sourceOrder];

    newItemOrder.splice(sourceOrder, 1);
    newItemOrder.splice(destinationOrder, 0, sourceItemId);

    const newState: stateType = { ...state, itemOrder: newItemOrder };
    setState(newState);
  };

  return (
    <>
      <main className={styles.main}>
        <Header title={"free note"} openFormModal={openFormModal} />
        <Section
          items={getItems()}
          toggleCheck={toggleCheck}
          deleteItem={deleteItem}
          swapItem={swapItem}
          openFormModal={openFormModal}
        />
      </main>

      {modalContent && <Modal closeModal={closeModal}>{modalContent}</Modal>}
    </>
  );
}

export default App;
