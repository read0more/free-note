import React, { useRef } from "react";
import { Item, ItemId } from "../../common/types";
import NoteItem from "../NoteItem/NoteItem";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Section.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageItem from "../ImageItem/ImageItem";
import VideoItem from "../VideoItem/VideoItem";

type Props = {
  items: Record<ItemId, Item> | undefined;
  toggleCheck: (id: ItemId) => void;
  deleteItem: (id: string) => void;
  swapItem: (id1: string, id2: string) => void;
  openFormModal: (item: Item) => void;
};

const Section: React.FC<Props> = ({
  items,
  toggleCheck,
  deleteItem,
  swapItem,
  openFormModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const getItemComponent = (item: Item) => {
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
            id={item.id}
            title={item.title}
            body={item.body}
            checked={item.checked}
            toggleCheck={toggleCheck}
          />
        );
    }
  };

  const onDeleteClick = (id: string) => () => deleteItem(id);
  const onEditClick = (item: Item) => () => openFormModal(item);

  const onMouseDown = (
    mouseDownEvent: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const mouseDownElement = mouseDownEvent.currentTarget.closest("li");
    const currentTarget = mouseDownEvent.currentTarget;
    const width = currentTarget.getBoundingClientRect().width;
    let clone = currentTarget.cloneNode(true) as HTMLLIElement;
    const rect = currentTarget.getBoundingClientRect();
    let shiftX = mouseDownEvent.clientX - rect.left;
    let shiftY = mouseDownEvent.clientY - rect.top;
    // item의 왼쪽 여백 + 오른쪽 여백 구해서 화면을 넘어가지 않는 선에서의 left의 최대값 구함
    let xLimit =
      currentTarget.offsetLeft +
      (document.documentElement.offsetWidth -
        currentTarget.offsetWidth -
        currentTarget.offsetLeft);
    let yLimit =
      document.documentElement.scrollHeight - currentTarget.offsetHeight;
    let isClick = true;

    clone.style.position = "absolute";
    clone.style.zIndex = "1000";
    clone.style.width = width + "px";
    clone.style.opacity = "0.6";
    clone.style.cursor = "move";

    clone.ondragstart = function () {
      return false;
    };

    setTimeout(() => {
      isClick = false;
    }, 200);

    function moveAt(target: HTMLElement, x: number, y: number) {
      let moveLeft = x - shiftX;
      let moveTop = y - shiftY;

      if (xLimit < moveLeft) {
        moveLeft = xLimit;
      }

      if (yLimit < moveTop) {
        moveTop = yLimit;
      }

      target.style.left = moveLeft + "px";
      target.style.top = moveTop + "px";
    }

    function onMouseUp(mouseUpevent: MouseEvent) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      clone.remove();

      if (!clone) {
        return;
      }

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

      sectionRef.current!.style.userSelect = "";
    }

    function onMouseMove(event: MouseEvent) {
      const delta = 5;
      const diffX = Math.abs(mouseDownEvent.pageX - event.pageX);
      const diffY = Math.abs(mouseDownEvent.pageY - event.pageY);

      // 미세하게 움직였다면 item 이동할거라 생각하고 처리
      if (isClick) {
        if (delta < diffX || delta < diffY) {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          clone.remove();
        }
        return;
      }

      sectionRef.current!.style.userSelect = "none";
      sectionRef.current?.append(clone);

      moveAt(clone, event.pageX, event.pageY);
    }

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
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
              {getItemComponent(items[id])}
              <div className={styles["icon-box"]}>
                <button className={styles.delete} onClick={onDeleteClick(id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                  className={styles.edit}
                  onClick={onEditClick(items[id])}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Section;
