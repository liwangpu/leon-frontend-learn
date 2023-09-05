import * as _ from 'lodash';

export class Person {

  public constructor(public name: string, public age: number) {

  }

  public hello() {
    console.log('hello!');
    _.has({}, 'name');
  }

}