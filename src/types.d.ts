export interface ActionWithoutPayload {
  readonly type: string;
}

export interface Event {
  preventDefault: () => void;
  target: { value: any };
}

export type StateType = ReturnType<typeof reducer>;
