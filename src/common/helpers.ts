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
