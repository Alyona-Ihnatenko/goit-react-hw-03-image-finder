import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { apiService } from '../servises/apiServise';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import css from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  // static API_KEY = '22389180-c3e3825fb04f5ed43216d445d';
  // static URL = 'https://pixabay.com/api/?q=';

  state = {
    hits: [],
    page: 1,
    isLoader: false,
    isModal: false,
    modalHit: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.resetState();
      this.loadImages();
    }

    if (prevState.page !== this.state.page && this.state.page > 1) {
      await this.loadImages();
      this.autoScroll();
    }
  }

  loadImages = async () => {
    try {
      const { query } = this.props;
      const { page } = this.state;

      this.setState({ isLoader: true });
      const response = await apiService(query, page);
      if (page === 1) {
        this.setState({
          hits: response.data.hits,
        });
      } else {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.data.hits],
        }));
      }
      // if (page > 1) {
      //   this.autoScroll();
      //  this.autoScroll();
      if (response.data.hits.length === 0) {
        return toast.warn('Oops, such item has not found');
      }
    } catch (error) {
      console.log(error);
      return toast.error('Error while loading data. Try again later');
    } finally {
      this.setState({ isLoader: false });
    }
  };

  // loadMoreImages = async () => {
  //   try {
  //     const { query } = this.props;
  //     const { page } = this.state;

  //     this.setState({ loader: true });

  //     const response = await apiService(query, page);

  //     this.setState(prevState => ({
  //       hits: [...prevState.hits, ...response.data.hits],
  //     }));

  //     if (response.data.hits.length === 0) {
  //       return toast.warn('Oops, such item has not found');
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     return toast.error('Error while loading data. Try again later');
  //   } finally {
  //     this.setState({ loader: false });
  //   }
  // };

  autoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetState = () => {
    this.setState({
      hits: [],
      page: 1,
    });
  };

  showModal = data => {
    this.setState({
      isModal: true,
      modalHit: data,
    });
  };

  hideModal = () => {
    this.setState({
      isModal: false,
      modalHit: {},
    });
  };

  render() {
    const { hits, isLoader, isModal, modalHit } = this.state;

    return (
      <main>
        {isLoader && <Loader />}
        {isModal && (
          <Modal onClose={this.hideModal}>
            <img src={modalHit.largeImageURL} alt={modalHit.tags} />
          </Modal>
        )}
        <ul className={css.ImageGallery}>
          {hits.map(hit => (
            <ImageGalleryItem
              key={hit.id}
              hit={hit}
              className={css.ImageGalleryItem}
              showModal={this.showModal}
            />
          ))}
        </ul>
        {hits.length >= 12 && <Button onClick={this.incrementPage} />}
      </main>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};
export { ImageGallery };
