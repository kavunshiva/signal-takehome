import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setGiphyApiKey } from '../actions/credentials';
import { fetchImages } from '../actions/images';
import { StateType } from '../types';

import Page from '../components/Page/Page';

const mapStateToProps = (state: StateType) => {
  const { credentials, images } = state;
  return {
    images: images.images,
    isFetching: images.isFetching,
    isGiphyApiKeySet: !!credentials.giphyApiKey,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    fetchImages: (searchQuery: string, reset: boolean) => fetchImages(searchQuery, reset),
    setGiphyApiKey: (giphyApiKey: string) => setGiphyApiKey(giphyApiKey),
  },
  dispatch,
);

const PageContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PageContainer;
