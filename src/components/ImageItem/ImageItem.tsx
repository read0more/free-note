import React from "react";
import { Image } from "../../common/types";
import styles from "./ImageItem.module.css";

const ImageItem: React.FC<Omit<Image, "type">> = ({ title, url }) => (
  <article>
    <figure className={styles.figure}>
      <img src={url} alt={title} className={styles.img} />
      <figcaption className={styles.figcaption}>{title}</figcaption>
    </figure>
  </article>
);

export default ImageItem;
