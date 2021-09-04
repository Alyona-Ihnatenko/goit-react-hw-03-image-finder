import LoaderInstance from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.wrapper}>
      <LoaderInstance />;
    </div>
  );
}

export  {Loader};