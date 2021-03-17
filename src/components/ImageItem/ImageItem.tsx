import React from "react";
import { Image } from "../../common/types";
import styles from "./ImageItem.module.css";

const ImageItem: React.FC<Omit<Image, "id" | "type">> = ({ title, url }) => (
  <article>
    <figure className={styles.figure}>
      <img src={url} alt={title} className={styles.img} />
      <figcaption>
        <h2 className={styles.title}>{title}</h2>
      </figcaption>
    </figure>
  </article>
);

export default ImageItem;
