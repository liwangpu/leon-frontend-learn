window.onload = function () {
  const btnTest = document.getElementById('btnTest');
  btnTest.addEventListener('click', testFn);
}

function testFn() {
  console.log(`test work!`,);
}