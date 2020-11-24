import React, { Component } from 'react';
import FullScreenImage from '../FullScreenImage/FullScreenImage';
import ImageGrid from '../ImageGrid/ImageGrid';
import Login from '../Login/Login';
import SearchBar from '../SearchBar/SearchBar';
import { Event } from '../../types';
import { Image } from '../../types/images';

type PageProps = {
  images: Array<Image>,
  isFetching: boolean,
  isGiphyApiKeySet: boolean,
  fetchImages: (searchQuery: string, reset: boolean) => void,
  setGiphyApiKey: (giphyApiKey: string) => void,
};

type PageState = {
  searchQuery: string,
  selectedImage: Image | null,
};

class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.state = {
      searchQuery: '',
      selectedImage: null,
    };

    this.debounce = this.debounce.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
    this.handleFullScreenImageClose = this.handleFullScreenImageClose.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.resetAndFetchNewImages = this.resetAndFetchNewImages.bind(this);
    this.setGiphyApiKey = this.setGiphyApiKey.bind(this);
  }

  debounce(callback: any, wait: number) {
    let timeout: any;
    return (...args: any) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }

  resetAndFetchNewImages = this.debounce(
    () => this.fetchImages(true),
    500,
  );

  componentDidUpdate(prevProps: PageProps, prevState: PageState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      return this.resetAndFetchNewImages();
    }
  }

  setGiphyApiKey(giphyApiKey: string) {
    return this.props.setGiphyApiKey(giphyApiKey);
  }

  fetchImages(reset: boolean=false) {
    const { searchQuery } = this.state;
    return this.props.fetchImages(searchQuery, reset);
  }

  handleImageSelect(e: { target: { id: string, alt: string } }) {
    const { id, alt } = e.target;
    return this.setState({ selectedImage: { id, title: alt } });
  }

  handleFullScreenImageClose() {
    return this.setState({ selectedImage: null });
  }

  handleSearchQueryChange(e: Event) {
    const { value: searchQuery } = e.target;
    return this.setState({ searchQuery });
  }

  render() {
    const { images, isFetching, isGiphyApiKeySet } = this.props;
    const { searchQuery, selectedImage } = this.state;
    if (!isGiphyApiKeySet) {
      return <Login setGiphyApiKey={this.setGiphyApiKey} />
    }
    if (selectedImage) {
      const { id, title } = selectedImage;
      return (
        <FullScreenImage
          id={id}
          title={title}
          onClose={this.handleFullScreenImageClose}
        />
      );
    }
    return (
      <div>
        <SearchBar searchQuery={searchQuery} onChange={this.handleSearchQueryChange} />
        <ImageGrid
          handleImageSelect={this.handleImageSelect}
          fetchImages={this.fetchImages}
          images={images}
          isFetching={isFetching}
          debounce={this.debounce}
        />
      </div>
    );
  }
}

export default Page;
