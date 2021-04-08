import React from "react";
import { Item, Video } from "../../../common/types";
import { getYoutubeVideoIdFromURL } from "../../../common/helpers";
import UrlForm from "../../UrlForm/UrlForm";
import styles from "./VideoItem.module.css";

type Props = {
  item: Video;
  addOrEditItem: (item: Item) => void;
  openModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

const VideoItem: React.FC<Props> = ({
  item,
  addOrEditItem,
  openModal,
  closeModal,
}) => {
  const { videoId } = item;
  const callback = (url: string) => {
    const videoId = getYoutubeVideoIdFromURL(url);
    addOrEditItem({ ...item, videoId });
  };

  const onClick = () => {
    openModal(<UrlForm callback={callback} afterSubmit={closeModal} />);
  };

  return videoId ? (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Youtube Player"
      className={styles.video}
    ></iframe>
  ) : (
    <div className={styles["button-box"]}>
      <button onClick={onClick} className={styles.button}>
        Youtube URL추가
      </button>
    </div>
  );
};

export default VideoItem;
