export function getYoutubeVideoIdFromURL(url: string): string {
  const [_, videoId] = url.split(/^https?:\/\/youtu.be\//i);

  if (!videoId) {
    throw Error("youtube URL을 확인해 주세요.");
  }

  return videoId;
}

export function getYoutubeURLFromVideoId(videoId: string): string {
  return videoId ? `https://youtu.be/${videoId}` : "";
}
