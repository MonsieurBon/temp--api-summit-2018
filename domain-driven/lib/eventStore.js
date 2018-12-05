'use strict';

class EventStore {
  constructor () {
    this.events = [];
  }

  save (event) {
    this.events.push(event);
  }
};

module.exports = new EventStore();
