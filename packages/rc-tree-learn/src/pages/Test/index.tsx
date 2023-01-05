import React, { useState, memo, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import styles from './index.module.scss';
import Tree from 'rc-tree';
import { DataNode } from 'rc-tree/lib/interface';

const Test: React.FC = memo(() => {

  const treeData = useMemo<Array<DataNode>>(() => {
    return [
      { key: 'a', title: 'A', isLeaf: false },
      { key: 'b', title: 'B', isLeaf: true },
    ];
  }, []);

  const loadData = async (node: DataNode) => {
    console.log(`load:`, node);
    return [];
  };

  return (
    <div className={styles['test']}>
      <div className={styles['test__header']}>
        <button className={styles['btn']}>测试</button>
      </div>
      <div className={styles['test__content']}>
        <Tree
          className="myCls"
          defaultExpandAll={false}
          loadData={loadData}
          treeData={treeData}
        />
      </div>
    </div>
  );
});

Test.displayName = 'Test';

export default Test;
