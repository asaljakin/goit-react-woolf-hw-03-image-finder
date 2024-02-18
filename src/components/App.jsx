import { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { STATUSES } from 'consts';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import getImages from 'api/api';

export default class App extends Component {
  state = {
    images: [],
    resultLength: 0,
    searchQuery: '',
    currentPage: 1,
    isOpen: false,
    largeImage: {},
    status: STATUSES.idle,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.handleGetImages();
    }
  }

  handleGetImages = () => {
    this.setState({ status: STATUSES.loading });
    getImages(this.state.searchQuery, this.state.currentPage)
      .then(res =>
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          status: STATUSES.success,
          resultLength: res.data.totalHits,
        }))
      )
      .catch(error => {
        this.setState({ error, status: STATUSES.error });
        alert(error.message);
      });
  };

  handleSubmit = value => {
    if (this.state.searchQuery.toLowerCase() === value.toLowerCase()) {
      alert("Try to find something else, it's already on your page");
      return;
    }
    if (this.state.searchQuery !== value) {
      this.setState({ searchQuery: value, currentPage: 1, images: [] });
      window.scrollTo(0, 0);
    }
  };

  setModalImg = ({ tags, largeImageURL }) => {
    this.setState({
      largeImage: { largeImageURL, tags },
      isOpen: true,
    });
  };

  toggleModal = e => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { isOpen, largeImage, status, images, resultLength } = this.state;

    return (
      <div className="App">
        {isOpen && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImage.largeImageURL} alt={largeImage.tag} />
          </Modal>
        )}
        {status === 'loading' && (
          <Modal>
            <ThreeCircles />
          </Modal>
        )}
        <Searchbar handleSubmit={this.handleSubmit} />
        {images.length > 0 || status === 'error' ? (
          <ImageGallery images={images} setModalImg={this.setModalImg} />
        ) : (
          <div className="container">
            {this.state.searchQuery.length === 0 ? (
              <h1>Search to find some images</h1>
            ) : (
              <>
                <h1>There are no images for your request</h1>
              </>
            )}
          </div>
        )}
        {resultLength > images.length && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
