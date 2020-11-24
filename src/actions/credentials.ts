import { CredentialAction } from '../types/credentials';
import { ActionWithoutPayload } from '../types';

export const SET_GIPHY_API_KEY: string = 'SET_GIPHY_API_KEY';
export const UNSET_GIPHY_API_KEY: string = 'UNSET_GIPHY_API_KEY';

export const setGiphyApiKey = (giphyApiKey: string): CredentialAction => ({
  type: SET_GIPHY_API_KEY,
  payload: { giphyApiKey },
});

export const unsetGiphyApiKey = (): ActionWithoutPayload => ({
  type: UNSET_GIPHY_API_KEY,
});
