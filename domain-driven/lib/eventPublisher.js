'use strict';

const { EventEmitter2 } = require('eventemitter2');

class EventPublisher extends EventEmitter2 {
  constructor () {
    super({ wildcard: true, delimiter: '::' });
  }

  publish (event) {
    this.emit(`events::${event.name}`, event);
  }
}

module.exports = new EventPublisher();
