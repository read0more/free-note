type ItemElement = {
  leftRatio: number;
  topRatio: number;
  widthRatio: number;
  heightRatio: number;
};

// todo: ItemElent필수로 바꿔야함. ItemModal쪽도 마찬가지.
export type Image = {
  id: string;
  type: "image";
  title: string;
  url: string;
} & Partial<ItemElement>;

export type Video = {
  id: string;
  type: "video";
  title: string;
  videoId: string;
} & Partial<ItemElement>;

export type Note = {
  id: string;
  type: "note";
  title: string;
  body: string;
} & Partial<ItemElement>;

export type Task = Omit<Note, "type"> & {
  type: "task";
  checked: boolean;
};

export type Item = Image | Video | Note | Task;
export type ItemType = Pick<Item, "type">[keyof Pick<Item, "type">];
export type ItemId = string;
