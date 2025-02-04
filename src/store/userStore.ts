import { makeObservable, observable, action } from "mobx";

export class User {
  username = "";

  constructor() {
    makeObservable(this, {
      username: observable,
      signIn: action,
      register: action,
    });
    this.title = title;
  }

  signIn(name: string) {
    this.username = name;
  }
  register(name: string) {
    this.username = name;
  }
}
