import React, { useEffect, useRef } from "react";
import {
  getYoutubeVideoIdFromURL,
  getYoutubeURLFromVideoId,
} from "../../common/helpers";
import { Item } from "../../common/types";
import styles from "./AddForm.module.css";

type Props = {
  item: Item;
  addOrEditItem: (item: Item) => void;
  closeModal: () => void;
};

const AddForm: React.FC<Props> = ({ item, addOrEditItem, closeModal }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = titleRef.current?.value || "";
    const url = urlRef.current?.value || "";
    const body = bodyRef.current?.value || "";

    switch (item.type) {
      case "image":
        addOrEditItem({
          ...item,
          title,
          url: url,
        });
        break;
      case "video":
        addOrEditItem({
          ...item,
          title,
          videoId: getYoutubeVideoIdFromURL(url),
        });
        break;
      case "note":
        addOrEditItem({
          ...item,
          title,
          body,
        });
        break;
      case "task":
        addOrEditItem({
          ...item,
          title,
          body,
          checked: false,
        });
        break;
    }

    closeModal();
  };

  const getDetailInputElements = () => {
    switch (item.type) {
      case "image":
        return (
          <>
            <label className={styles.label}>URL</label>
            <input
              type="url"
              required={true}
              ref={urlRef}
              placeholder={"이미지 URL을 입력해주세요."}
              className={styles.input}
              defaultValue={item.url}
            ></input>
          </>
        );
      case "video":
        return (
          <>
            <label className={styles.label}>URL</label>
            <input
              type="url"
              required={true}
              ref={urlRef}
              placeholder={"Youtube 공유URL을 입력해주세요."}
              className={styles.input}
              defaultValue={getYoutubeURLFromVideoId(item.videoId)}
            ></input>
          </>
        );
      case "note":
        return (
          <>
            <label className={styles.label}>Body</label>
            <textarea
              required={true}
              ref={bodyRef}
              placeholder={"메모할 내용을 입력해주세요."}
              className={styles.textarea}
              defaultValue={item.body}
            ></textarea>
          </>
        );
      case "task":
        return (
          <>
            <label className={styles.label}>Body</label>
            <textarea
              required={true}
              ref={bodyRef}
              placeholder={"업무 내용을 입력해주세요."}
              className={styles.textarea}
              defaultValue={item.body}
            ></textarea>
          </>
        );
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
      <label className={styles.label}>Title</label>
      <input
        type="text"
        ref={titleRef}
        required={true}
        placeholder={"제목"}
        className={styles.input}
        defaultValue={item.title}
      ></input>
      {getDetailInputElements()}
      <button type="submit" className={styles.button}>
        <b>ADD</b>
      </button>
    </form>
  );
};

export default AddForm;
