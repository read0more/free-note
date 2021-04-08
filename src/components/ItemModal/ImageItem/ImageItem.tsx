import React from "react";
import { Image, Item } from "../../../common/types";
import UrlForm from "../../UrlForm/UrlForm";
import styles from "./ImageItem.module.css";

type Props = {
  item: Image;
  addOrEditItem: (item: Item) => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const ImageItem: React.FC<Props> = ({
  item,
  addOrEditItem,
  openModal,
  closeModal,
}) => {
  const { url, title } = item;

  const callback = (url: string) => {
    addOrEditItem({ ...item, url });
  };

  const onClick = () => {
    openModal(<UrlForm callback={callback} afterSubmit={closeModal} />);
  };

  return url ? (
    <img src={url} className={styles.img} alt={title}></img>
  ) : (
    <div className={styles["button-box"]}>
      <button onClick={onClick} className={styles.button}>
        이미지 URL로 추가
      </button>
    </div>
  );
};

export default ImageItem;
