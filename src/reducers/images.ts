import { ImageAction, ImageState } from '../types/images';

const initialState: ImageState = {
  images: [],
  offset: 0,
  isFetching: false,
};

const imagesReducer = (state: ImageState = initialState, action: ImageAction) => {
  switch (action.type) {
    case 'FETCHING_IMAGES':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_IMAGES_SUCCESS':
      const { images, offset, isFetching, reset } = action.payload;
      let newImages;
      if (reset) {
        newImages = images;
      } else {
        newImages = [ ...state.images, ...images ];
      }
      return {
        ...state,
        images: newImages,
        offset,
        isFetching,
      };
    case 'FETCH_IMAGES_FAILURE':
      return initialState;
    default:
      return state;
  }
}

export default imagesReducer;
