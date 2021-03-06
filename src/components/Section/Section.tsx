import React, { useRef } from "react";
import { Item, ItemId } from "../../common/types";
import NoteItem from "../NoteItem/NoteItem";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Section.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageItem from "../ImageItem/ImageItem";
import VideoItem from "../VideoItem/VideoItem";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: string, id2: string) => void;
};

const Section: React.FC<Props> = ({
  items,
  toggleCheck,
  deleteItem,
  swapItem,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const getItemComponent = (key: ItemId, item: Item) => {
    switch (item.type) {
      case "image":
        return <ImageItem title={item.title} url={item.url} />;
      case "video":
        return <VideoItem title={item.title} videoId={item.videoId} />;
      case "note":
        return <NoteItem title={item.title} body={item.body} />;
      case "task":
        return (
          <TaskItem
            id={key}
            title={item.title}
            body={item.body}
            checked={item.checked}
            toggleCheck={toggleCheck}
          />
        );
    }
  };

  const onClick = (id: string) => () => deleteItem(id);

  const onMouseDown = (
    mouseDownEvent: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const mouseDownElement = mouseDownEvent.currentTarget.closest("li");

    if (mouseDownElement?.nodeName !== "LI") {
      return;
    }

    const currentTarget = mouseDownEvent.currentTarget;
    const clone = currentTarget.cloneNode(true) as HTMLLIElement;
    const rect = currentTarget.getBoundingClientRect();
    let shiftX = mouseDownEvent.clientX - rect.left;
    let shiftY = mouseDownEvent.clientY - rect.top;
    const width = currentTarget.getBoundingClientRect().width;
    // item의 왼쪽 여백 + 오른쪽 여백 구해서 left 최대값 구함
    let xLimit =
      currentTarget.offsetLeft +
      (document.documentElement.offsetWidth -
        currentTarget.offsetWidth -
        currentTarget.offsetLeft);
    let yLimit =
      document.documentElement.scrollHeight - currentTarget.offsetHeight;

    clone.style.position = "absolute";
    clone.style.zIndex = "1000";
    clone.style.width = width + "px";
    clone.style.opacity = "0.6";
    sectionRef.current?.append(clone);

    function moveAt(x: number, y: number) {
      let moveLeft = x - shiftX;
      let moveTop = y - shiftY;

      if (xLimit < moveLeft) {
        moveLeft = xLimit;
      }

      if (yLimit < moveTop) {
        moveTop = yLimit;
      }

      clone.style.left = moveLeft + "px";
      clone.style.top = moveTop + "px";
    }

    moveAt(mouseDownEvent.pageX, mouseDownEvent.pageY);

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
    }

    clone.ondragstart = function () {
      return false;
    };

    document.addEventListener("mousemove", onMouseMove);

    function onMouseUp(mouseUpevent: MouseEvent) {
      document.removeEventListener("mousemove", onMouseMove);

      clone.hidden = true;
      const below = document.elementFromPoint(
        mouseUpevent.clientX,
        mouseUpevent.clientY
      );
      const belowLi = below?.closest("li");
      clone.hidden = false;

      if (belowLi) {
        swapItem(belowLi.dataset.id || "", mouseDownElement?.dataset.id || "");
      }

      clone.removeEventListener("mouseup", onMouseUp);
      clone.remove();
    }

    clone.addEventListener("mouseup", onMouseUp);
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <ul>
        {items &&
          Object.keys(items).map((id) => (
            <li
              key={id}
              className={styles.item}
              data-id={id}
              onMouseDown={onMouseDown}
            >
              {getItemComponent(id, items[id])}
              <div className={styles.delete} onClick={onClick(id)}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Section;
