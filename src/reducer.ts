import { combineReducers } from 'redux';

import credentialsReducer from './reducers/credentials';
import imagesReducer from './reducers/images';

const rootReducer = combineReducers({
  credentials: credentialsReducer,
  images: imagesReducer,
});

export default rootReducer;
