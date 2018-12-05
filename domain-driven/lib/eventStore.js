'use strict';

class EventStore {
  constructor () {
    this.events = [];
  }

  save (event) {
    this.events.push(event);
  }

  getEventStream (aggregateId) {
    const events = this.events.
      filter(event => event.aggregateId === aggregateId);

    return events;
  }
};

module.exports = new EventStore();
