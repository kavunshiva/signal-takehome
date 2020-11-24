export interface Image {
  id: string;
  title: string;
}

export interface ImageState {
  readonly images: Array<Image>;
  readonly offset: number;
  readonly isFetching: boolean;
}

export interface ImageAction {
  readonly type: string;
  readonly payload: ImageState & { reset: boolean };
}
