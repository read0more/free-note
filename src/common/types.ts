export type Image = {
  type: "image";
  title: string;
  url: string;
};

export type Video = Omit<Image, "type"> & {
  type: "video";
};

export type Note = {
  type: "note";
  title: string;
  body: string;
};

export type Task = Omit<Note, "type"> & {
  type: "task";
  checked: boolean;
};

export type Item = Image | Video | Note | Task;
export type ItemId = string;
