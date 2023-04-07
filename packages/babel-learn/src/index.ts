async function doTask() {
  return true;
}


async function startup() {
  const res = await doTask();
  console.log(`res:`, res);
}