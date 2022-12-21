import React, { useState, memo } from 'react';
import { faker } from '@faker-js/faker';
import styles from './index.module.scss';

const Home: React.FC = memo(() => {

  return (
    <div className={styles['home']}>

    </div>
  );
});

Home.displayName = 'Home';

export default Home;
