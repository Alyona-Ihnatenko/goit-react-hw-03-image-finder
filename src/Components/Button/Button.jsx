import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onClick }) {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
export { Button };
