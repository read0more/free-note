export type Image = {
  id: string;
  type: "image";
  title: string;
  url: string;
};

export type Video = {
  id: string;
  type: "video";
  title: string;
  videoId: string;
};

export type Note = {
  id: string;
  type: "note";
  title: string;
  body: string;
};

export type Task = Omit<Note, "type"> & {
  type: "task";
  checked: boolean;
};

export type Item = Image | Video | Note | Task;
export type ItemType = Pick<Item, "type">[keyof Pick<Item, "type">];
export type ItemId = string;
