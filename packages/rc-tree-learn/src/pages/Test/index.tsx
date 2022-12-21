import React, { useState, memo } from 'react';
import { faker } from '@faker-js/faker';
import styles from './index.module.scss';

const Test: React.FC = memo(() => {

  return (
    <div className={styles['test']}>

    </div>
  );
});

Test.displayName = 'Test';

export default Test;
