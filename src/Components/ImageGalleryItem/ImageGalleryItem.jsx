
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';


function ImageGalleryItem(props) {
  const { webformatURL, tags } = props.hit;
  const { showModal } = props;

  return (
    <li className={css.item}>
      <img
        width="600"
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={() => showModal(props.hit)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.object,
  showModal: PropTypes.func,
};

export  {ImageGalleryItem};