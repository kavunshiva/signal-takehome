import { unsetGiphyApiKey } from './credentials';
import { Dispatch } from 'redux';
import { ActionWithoutPayload, StateType } from '../types';
import { Image, ImageAction, ImageState } from '../types/images';

export const FETCHING_IMAGES = 'FETCHING_IMAGES';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export const fetchImages = (searchQuery: string='', reset: boolean=false) => {
  return (dispatch: Dispatch, getState: () => StateType): Promise<void> => {
    const { credentials, images } = getState();
    const { giphyApiKey } = credentials;
    const giphyUri = getGiphyUri(searchQuery, giphyApiKey, images, reset);
    dispatch(fetchingImages());
    return fetch(giphyUri)
      .then(res => {
        if (res.status === 403) {
          dispatch(unsetGiphyApiKey());
          dispatch(fetchImagesFailure());
          window.alert('Invalid API key.');
        }
        return res.json();
      })
      .then(res => {
        const images = res.data.map((image: Image): Image => ({ id: image.id, title: image.title }));
        const offset = res.pagination.count + res.pagination.offset;
        dispatch(fetchImagesSuccess({ images, offset, isFetching: false, reset }))
      })
      .catch(err => console.log(err));
  };
};

const getGiphyUri = (searchQuery: string, giphyApiKey: string, images: ImageState, reset: boolean=false) => {
  const giphyBaseUrl = 'https://api.giphy.com/v1/gifs';
  const endpoint = searchQuery ? '/search' : '/trending';
  const offset = reset ? 0 : images.offset
  const query = searchQuery ? `&q=${searchQuery}` : '';
  return `${giphyBaseUrl}${endpoint}?` +
    `api_key=${giphyApiKey}&` +
    `offset=${offset}` +
    `${query}`;
}

const fetchingImages = (): ActionWithoutPayload => ({
  type: FETCHING_IMAGES,
});

const fetchImagesSuccess = (payload: ImageState & { reset: boolean }): ImageAction => ({
  type: FETCH_IMAGES_SUCCESS,
  payload,
});

const fetchImagesFailure = (): ActionWithoutPayload => ({
  type: FETCH_IMAGES_FAILURE,
});
