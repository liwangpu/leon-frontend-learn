import { add } from './tool';

class Person {
  hello() {
    console.log(`hello!`, add(1, 2));
  }
}

const p = new Person();
p.hello();