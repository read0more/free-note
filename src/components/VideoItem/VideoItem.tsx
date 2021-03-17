import React from "react";
import { Video } from "../../common/types";
import styles from "./VideoItem.module.css";

const VideoItem: React.FC<Omit<Video, "id" | "type">> = ({
  title,
  videoId,
}) => {
  return (
    <article className={styles.article}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Youtube Player"
        className={styles.video}
      ></iframe>
      <h2 className={styles.title}>{title}</h2>
    </article>
  );
};

export default VideoItem;
