import { CredentialAction, CredentialState } from '../types/credentials';

const initialState: CredentialState = {
  giphyApiKey: '',
  isValid: false,
};

const credentialsReducer = (state: CredentialState = initialState, action: CredentialAction) => {
  switch (action.type) {
    case 'SET_GIPHY_API_KEY': {
      const { giphyApiKey } = action.payload;
      return {
        ...state,
        giphyApiKey,
        isValid: true,
      };
    }
    case 'UNSET_GIPHY_API_KEY': {
      return initialState;
    }
    default:
      return state;
  }
}

export default credentialsReducer;
