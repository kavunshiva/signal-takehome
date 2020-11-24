export interface CredentialState {
  readonly giphyApiKey: string;
  readonly isValid: boolean;
}

export interface CredentialAction {
  readonly type: string;
  readonly payload: { giphyApiKey: string };
}
