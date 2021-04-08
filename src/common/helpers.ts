export function getYoutubeVideoIdFromURL(url: string): string {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
  const match = url.match(regExp);
  const videoId = match ? match[1] || match[2] : undefined;

  if (!videoId) {
    throw Error("youtube URL을 확인해 주세요.");
  }

  return videoId;
}

export function getYoutubeURLFromVideoId(videoId: string): string {
  return videoId ? `https://youtu.be/${videoId}` : "";
}

export function getSizeRatio(
  parentElement: HTMLElement,
  childElement: HTMLElement
): any {
  return {
    widthRatio: (childElement.clientWidth / parentElement.clientWidth) * 100,
    heightRatio: (childElement.clientHeight / parentElement.clientHeight) * 100,
  };
}

export function getSizeFromRatio(
  parentElement: HTMLElement,
  childWidthRatio: number,
  childHeightRatio: number
) {
  return {
    width: (parentElement.clientWidth * childWidthRatio) / 100,
    height: (parentElement.clientHeight * childHeightRatio) / 100,
  };
}

export function getLocationRatio(
  parentElement: HTMLElement,
  childElement: HTMLElement
): any {
  return {
    leftRatio: (childElement.offsetLeft / parentElement.clientWidth) * 100,
    topRatio: (childElement.offsetTop / parentElement.clientHeight) * 100,
  };
}

export function getLocationFromRatio(
  parentElement: HTMLElement,
  childLeftRatio: number,
  childTopRatio: number
) {
  return {
    left: (parentElement.clientWidth * childLeftRatio) / 100,
    top: (parentElement.clientHeight * childTopRatio) / 100,
  };
}
