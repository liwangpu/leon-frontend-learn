import * as _ from 'lodash';

async function doTask() {
  return true;
}


async function startup() {
  const res = await doTask();
  console.log(`res:`, res);
  console.log(`title:`, _.isFunction(doTask));
}

startup();