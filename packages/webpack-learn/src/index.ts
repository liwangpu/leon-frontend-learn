
function load(boxFile) {
  const m = import(`./box/${boxFile}`);
  console.log(`m:`, m);
}


load('a');