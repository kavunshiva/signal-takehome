import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Image } from '../../types/images';

interface ImageProps {
  handleImageSelect: (e: any) => void;
  fetchImages: () => void;
  images: Array<Image>;
  isFetching: boolean;
  debounce: any;
};

class ImageGrid extends Component<ImageProps> {
  constructor(props: ImageProps) {
    super(props);

    this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.props.debounce(() => this.infiniteScroll(), 500));
    return this.props.fetchImages();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.debounce(() => this.infiniteScroll(), 500));
  }

  infiniteScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop >= offsetHeight - 1) this.props.fetchImages();
  }

  renderImages() {
    const { images, isFetching } = this.props;

    return (
      <div>
        <div>
          {
            images && images.map((image, i) => {
              const { id, title } = image;
              return (
                <img
                  key={i}
                  id={id}
                  src={`https://i.giphy.com/media/${id}/200w.gif`}
                  alt={title}
                  style={{ margin: 20 }}
                  onClick={this.props.handleImageSelect}
                />
              );
            })
          }

        </div>
        { isFetching ? <LoadingSpinner /> : null }
      </div>
    );
  }

  render() {
    return this.renderImages();
  }
}

export default ImageGrid;
