export function getYoutubeVideoIdFromURL(url: string): string {
  const [_, videoId] = url.split(/^https?:\/\/youtu.be\//i);

  if (!videoId) {
    throw Error("youtube URL을 확인해 주세요.");
  }

  return videoId;
}
