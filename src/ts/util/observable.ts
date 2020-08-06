class Observable {
  observers: any;
  constructor() {
    this.observers = [];
  }

  subscribe(f: any) {
    this.observers.push(f);
  }

  notify(data: any) {
    this.observers.forEach((observer: any) => observer(data));
  }
}

export default Observable;
