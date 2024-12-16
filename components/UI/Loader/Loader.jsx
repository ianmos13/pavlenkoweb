import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ loading, children }) => {
  if (loading) {
    return (
      <>
        <div className={styles.overlay}></div> 
        <div className={styles.loaderBox}>
          <span className={styles.loaderLine}></span>
        </div>
      </>
    );
  }

  return <div>{children}</div>;
};

export default Loader;
