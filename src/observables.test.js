import Observable from "./Shared/Observable";
import { observe, observable, computed } from "mobx";
import { Subject, BehaviorSubject } from "rxjs";

class Person {
  @observable age = null;
}

it("pub/sub with normal observable", () => {
  let person = new Person();

  var personObservable = new Observable(person);
  personObservable.value = 37;

  personObservable.subscribe((value) => {
    console.log(value);
  });

  personObservable.value = 40;

  personObservable.notify();
});

it("pub/sub with Mobx FRP library", () => {
  let person = new Person();
  observable(person);

  observe(person, "age", (obj) => {
    console.log(person.age);
  });

  person.age = 37;
  person.age = 40;
});

it.only("pub/sub with RXJS FRP library", () => {
  let person = new Person();
  person.age = 38;

  let subject = new BehaviorSubject(person);
  subject.subscribe((p) => {
    console.log(p.age);
  }, true);

  person.age = 41;
  subject.next(person);
});
