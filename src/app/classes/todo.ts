export class Todo {
    id = 0;
    title = '';
    complete: false;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
