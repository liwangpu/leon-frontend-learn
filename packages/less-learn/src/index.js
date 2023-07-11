import './index.module.less';

window.onload = function () {
  const btnTest = document.getElementById('btnTest');
  if (btnTest) {
    btnTest.addEventListener('click', testFn);
  }
}

function testFn() {
  console.log(`test work!`,);
}